const Sequelize = require('sequelize');
const db = require('../db.js');
const SavedJobs = require('./savedJobs.js');
const User = require('./User.js');

const Notes = db.define('Notes', {
  Start: {
    type: Sequelize.STRING,
  },
  Application: {
    type: Sequelize.STRING,
  },
  Submit: {
    type: Sequelize.STRING,
  },
  Interview: {
    type: Sequelize.STRING,
  },
  Offer: {
    type: Sequelize.STRING,
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
