'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  User.associate = function(models) {
    User.hasOne(models.UserRoles);
  };
  return User;
};