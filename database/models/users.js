'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    role_id: DataTypes.INTEGER,
    currentPoints: DataTypes.INTEGER,
    lifetimePoints: DataTypes.INTEGER,
    isSuspend: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};