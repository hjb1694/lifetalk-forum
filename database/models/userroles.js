'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    description: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.User, {foreignKey : 'role_id'});
  };
  return Role;
};