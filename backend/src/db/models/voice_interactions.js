const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const voice_interactions = sequelize.define(
    'voice_interactions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

transcript: {
        type: DataTypes.TEXT,

      },

interaction_date: {
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

  voice_interactions.associate = (db) => {

    db.voice_interactions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.voice_interactions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return voice_interactions;
};

