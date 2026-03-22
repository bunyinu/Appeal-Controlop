const db = require('../db/models');

class Logger {
  static async log({ organizationId, caseId, actorUserId, actionType, message, metadata = {} }) {
    try {
      await db.activity_logs.create({
        organizationId,
        caseId,
        actor_userId: actorUserId,
        actionType,
        message,
        metadata,
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }
}

module.exports = Logger;
