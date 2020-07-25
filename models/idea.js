// Creating Idea model
const Moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Idea = sequelize.define("idea", {
    // date: {
    //   type: DataTypes.DATE,
    //   get: function () {
    //     return Moment(this.getDataValue("date")).format("MMMM Do, YYYY");
    //   },
    // },
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
    // status: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "Personal",
    //   // enum: ["public", "private"],
    // },
    // user: {
    //   type: DataTypes._id,
    //   ref: "user",
    // },
  });

  Idea.associate = function (models) {
    //associating user with his ideas
    Idea.belongsTo(models.user, {
      // onDelete: "cascade",
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Idea;
};
