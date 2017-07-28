const Sequelize = require('sequelize');
const db = require('../db.js');
const SavedJobs = require('./savedJobs.js');
const User = require('./User.js');

const Notes = db.define('Notes', {
  Start: {
    type: Sequelize.STRING(2000),
  },
  Application: {
    type: Sequelize.STRING(2000),
  },
  Submit: {
    type: Sequelize.STRING(2000),
  },
  Interview: {
    type: Sequelize.STRING(2000),
  },
  Offer: {
    type: Sequelize.STRING(2000),
  },
});

Notes.belongsTo(SavedJobs, {
  as: 'Notes',
  foreignKey: 'job_id',
  constraints: false,
});

SavedJobs.hasMany(Notes, {
  foreignKey: 'job_id',
  constraints: false,
});

Notes.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
  constraints: false,
});

User.hasMany(Notes, { foreignKey: 'user_id', constraints: false });

Notes.sync();

module.exports = Notes;
