const express = require('express');
const config = require('../config');
const path = require('path');
const passport = require('passport');
const services = require('../services/file');
const router = express.Router();

router.get('/download', passport.authenticate('jwt', {session: false}), async (req, res) => {
  // Tenant security check for documents
  if (req.query.privateUrl && req.query.privateUrl.startsWith('documents/')) {
    const db = require('../db/models');
    const doc = await db.documents.findOne({ where: { attachments: { [db.Sequelize.Op.like]: '%' + req.query.privateUrl + '%' } } });
    if (!doc || (doc.organizationId !== req.currentUser.organizationId && !req.currentUser.app_role.globalAccess)) {
      return res.status(403).send('Forbidden');
    }
  }

  if (process.env.NODE_ENV == "production" || process.env.NEXT_PUBLIC_BACK_API) {
    services.downloadGCloud(req, res);
  }
  else {
    services.downloadLocal(req, res);
  }
});

router.post('/upload/:table/:field', passport.authenticate('jwt', {session: false}), (req, res) => {
  const fileName = `${req.params.table}/${req.params.field}`;

  if (process.env.NODE_ENV == "production" || process.env.NEXT_PUBLIC_BACK_API) {
    services.uploadGCloud(fileName, req, res);
  }
  else {
    services.uploadLocal(fileName, {
      entity: null,
      maxFileSize: 10 * 1024 * 1024,
      folderIncludesAuthenticationUid: false,
    })(req, res);
  }
});

module.exports = router;
