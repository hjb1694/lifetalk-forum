'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    name: DataTypes.STRING,
    icon: {
      type: DataTypes.TEXT, 
      allowNull : true
    }
  }, {});
  PostCategory.associate = function(models) {
    // associations can be defined here
  };
  return PostCategory;
};