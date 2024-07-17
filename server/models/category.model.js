'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Define associations here
      // For example, if Category has many Tasks:
      this.hasMany(models.Task, { foreignKey: 'categoryId' });
    }
  }
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Use DataTypes.NOW for current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for current timestamp
      onUpdate: DataTypes.NOW // Use onUpdate with DataTypes.NOW for automatic update
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: true
  });

  return Category;
};