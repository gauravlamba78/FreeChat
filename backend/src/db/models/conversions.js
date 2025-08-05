const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const conversions = sequelize.define(
    'conversions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

conversion_type: {
        type: DataTypes.TEXT,

      },

requested_at: {
        type: DataTypes.DATE,

      },

completed_at: {
        type: DataTypes.DATE,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  conversions.associate = (db) => {

    db.conversions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.conversions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return conversions;
};

