const Sequelize = require('sequelize');
const db = require('../db.js');
const User = require('./User.js');

const SavedJobs = db.define('SavedJobs', {
  company: {
    type: Sequelize.STRING,
  },
  job_url: {
    type: Sequelize.STRING,
  },
  position: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
  },
  post_date: {
    type: Sequelize.DATE,
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
  applied_date: {
    type: Sequelize.DATE,
  },
  closed_date: {
    type: Sequelize.DATE,
  },
  cover_letter_key: {
    type: Sequelize.TEXT,
  },
});

SavedJobs.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
  constraints: false,
});

User.hasMany(SavedJobs, { foreignKey: 'user_id', constraints: false });

SavedJobs.sync();

module.exports = SavedJobs;
