const db = require('../db/models');
const { ValidationError } = require('../helpers');
const { Logger } = require('./logger');

class Appeal_draftsService {
  static async create(data, currentUser) {
    if (!data.caseId) {
       throw new ValidationError('caseIdRequired', 'Case ID is required');
    }
    
    // Auth: current user org must match case org
    const cases = await db.cases.findByPk(data.caseId);
    if (!cases || (cases.organizationId !== currentUser.organizationId && !currentUser.app_role.globalAccess)) {
       throw new ValidationError('accessDenied', 'Cannot create draft for this case');
    }

    // Versioning
    const maxVersionDraft = await db.appeal_drafts.findOne({
      where: { caseId: data.caseId },
      order: [['version', 'DESC']]
    });
    
    data.version = (maxVersionDraft ? maxVersionDraft.version : 0) + 1;
    data.organizationId = currentUser.organizationId;
    data.status = 'draft';

    const draft = await db.appeal_drafts.create(data);
    await Logger.log(currentUser, 'appeal_drafts', draft.id, 'Draft created', { version: data.version });
    return draft;
  }

  static async update(data, id, currentUser) {
    const draft = await db.appeal_drafts.findByPk(id);
    if (!draft) {
      throw new ValidationError('draftNotFound', 'Draft not found');
    }

    if (draft.status === 'submitted') {
      throw new ValidationError('draftIsReadOnly', 'Submitted drafts are read-only');
    }

    const isSubmitting = data.status === 'submitted';
    
    if (isSubmitting) {
       // Role check: Only case owner or admin can submit appeal
       const cases = await db.cases.findByPk(draft.caseId);
       const isAdmin = currentUser.app_role.name === 'admin' || currentUser.app_role.globalAccess;
       const isOwner = cases.owner_userId === currentUser.id;

       if (!isOwner && !isAdmin) {
          throw new ValidationError('accessDenied', 'Only the case owner or an administrator can submit an appeal');
       }

       // Only one draft can be submitted per case
       const existingSubmitted = await db.appeal_drafts.findOne({
         where: { caseId: draft.caseId, status: 'submitted' }
       });

       if (existingSubmitted) {
         throw new ValidationError('alreadySubmitted', 'Another draft is already submitted for this case');
       }

       data.submitted_at = new Date();
       data.submittedByUserId = currentUser.id;

       // Sync case status
       const CasesService = require('./cases');
       await CasesService.update({ status: 'submitted', submitted_at: data.submitted_at }, draft.caseId, currentUser);
    }

    await db.appeal_drafts.update(data, { where: { id } });
    return await db.appeal_drafts.findByPk(id);
  }

  static async deleteByIds(ids, currentUser) {
    for (const id of ids) {
      const draft = await db.appeal_drafts.findByPk(id);
      if (draft && draft.status === 'submitted') {
        throw new ValidationError('cannotDeleteSubmittedDraft', 'Cannot delete submitted drafts');
      }
    }
    return await db.appeal_drafts.destroy({ where: { id: ids } });
  }

  static async remove(id, currentUser) {
    return this.deleteByIds([id], currentUser);
  }
}

module.exports = Appeal_draftsService;
