'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'author',
        onDelete: 'CASCADE' // Optional: cascade delete if User is deleted
      });

    }
  }
  Post.init({
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    author: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};