// Creating Idea model
const Moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const IdeaSchema = sequelize.define("idea", {
    date: {
      type: DataTypes.DATE,
      get: function () {
        return Moment(this.getDataValue("date")).format("MMMM Do, YYYY");
      },
    },
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
    // category: {
    //   type: DataTypes.STRING,
    //   defaultValue: "private",
    //   enum: ["public", "private"],
    // },
    // user: {
    //   type: DataTypes._id,
    //   ref: "user",
    // },
    // field: {
    //   type: DataTypes.STRING,
    //   defaultValue: "pets",
    //   allowNull: true,
    // },
  });

  // Idea.associate = function (models) {
  //   //associating user with his ideas
  //   Idea.belongsTo(models.User, {
  //     onDelete: "cascade",
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return IdeaSchema;
};
