// Creating Idea model
const Moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Idea = sequelize.define("idea", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "public",
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "general",
    },
  });

  Idea.associate = function (models) {
    Idea.belongsTo(models.user);
  };
  return Idea;
};
