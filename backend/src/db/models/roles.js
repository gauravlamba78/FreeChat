const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const roles = sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,

      },

role_customization: {
        type: DataTypes.TEXT,

      },

globalAccess: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

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

  roles.associate = (db) => {

    db.roles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.roles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return roles;
};

