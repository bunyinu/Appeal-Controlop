const db = require('../db/models');
const Activity_logsDBApi = require('../db/api/activity_logs');
const processFile = require("../middlewares/upload");
const ValidationError = require('./notifications/errors/validation');
const csv = require('csv-parser');
const axios = require('axios');
const config = require('../config');
const stream = require('stream');





module.exports = class Activity_logsService {
  static async create() { throw new Error('ActivityLogs are read-only'); }
  static async bulkImport() { throw new Error('ActivityLogs are read-only'); }
  static async update() { throw new Error('ActivityLogs are read-only'); }
  static async deleteByIds() { throw new Error('ActivityLogs are read-only'); }
  static async remove(id, currentUser) { throw new Error("ActivityLogs are read-only");
    const transaction = await db.sequelize.transaction();

    try {
      await Activity_logsDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  
};


