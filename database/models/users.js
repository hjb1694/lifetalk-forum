'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    role_id: DataTypes.INTEGER,
    currentPoints: DataTypes.INTEGER,
    lifetimePoints: DataTypes.INTEGER,
    isSuspend: {
      type : DataTypes.BOOLEAN,
      defaultValue : 0
    },
    isDeleted: {
      type : DataTypes.BOOLEAN, 
      defaultValue : 0
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};