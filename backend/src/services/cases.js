const db = require('../db/models');
const { ValidationError } = require('../helpers');
const { Logger } = require('./logger');

class CasesService {
  static async update(data, id, currentUser) {
    const cases = await db.cases.findByPk(id);

    if (!cases) {
      throw new ValidationError('casesNotFound', 'Case not found');
    }

    if (currentUser.organizationId !== cases.organizationId && !currentUser.app_role.globalAccess) {
      throw new ValidationError('accessDenied', 'Access denied');
    }

    // Role check: Only case owner or admin can change status
    const isAdmin = currentUser.app_role.name === 'admin' || currentUser.app_role.globalAccess;
    const isOwner = cases.owner_userId === currentUser.id;
    
    if (data.status && data.status !== cases.status) {
      if (!isOwner && !isAdmin) {
         throw new ValidationError('accessDenied', 'Only the case owner or an administrator can change the case status');
      }
      
      // Persist timestamps based on status
      if (data.status === 'submitted') {
        data.submitted_at = new Date();
      } else if (['won', 'lost'].includes(data.status)) {
        data.closed_at = new Date();
      }
      
      await Logger.log(currentUser, 'cases', id, `Status changed from ${cases.status} to ${data.status}`, {
        from: cases.status,
        to: data.status,
        reason: data.statusReason || ''
      });
    }

    if (data.owner_userId && data.owner_userId !== cases.owner_userId) {
       await Logger.log(currentUser, 'cases', id, `Owner changed`, {
         from: cases.owner_userId,
         to: data.owner_userId
       });
    }

    return await db.cases.update(data, { where: { id } });
  }

  static async assignOwner(id, ownerUserId, currentUser) {
    return this.update({ owner_userId: ownerUserId }, id, currentUser);
  }

  static async changeStatus(id, status, statusReason, currentUser) {
    return this.update({ status, statusReason }, id, currentUser);
  }

  static async submitAppeal(id, currentUser) {
    return this.update({ status: 'submitted' }, id, currentUser);
  }

  static async markWon(id, reason, currentUser) {
    return this.update({ status: 'won', statusReason: reason }, id, currentUser);
  }

  static async markLost(id, reason, currentUser) {
    return this.update({ status: 'lost', statusReason: reason }, id, currentUser);
  }

  static async reopen(id, reason, currentUser) {
    const cases = await db.cases.findByPk(id);
    if (!['won', 'lost', 'submitted'].includes(cases.status)) {
       throw new ValidationError('invalidReopen', 'Only submitted or closed cases can be reopened');
    }
    return this.update({ status: 'intake', statusReason: reason, closed_at: null }, id, currentUser);
  }

  static async remove(id, currentUser) {
    const cases = await db.cases.findByPk(id);
    if (!cases) {
      throw new ValidationError('casesNotFound', 'Case not found');
    }
    if (currentUser.organizationId !== cases.organizationId && !currentUser.app_role.globalAccess) {
      throw new ValidationError('accessDenied', 'Access denied');
    }
    return await db.cases.destroy({ where: { id } });
  }
}

module.exports = CasesService;
