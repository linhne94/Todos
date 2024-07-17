'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskStatus extends Model {
    static associate(models) {
      // Define associations here
      // For example, if TaskStatus has many Tasks:
      this.hasMany(models.Task, { foreignKey: 'taskStatusId' });
    }
  }
  TaskStatus.init({
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
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'TaskStatus',
    tableName: 'task_status',
    timestamps: true
  });

  return TaskStatus;
};
