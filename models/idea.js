// Creating Story model

module.exports = function (sequelize, DataTypes) {
  const IdeaSchema = sequelize.define("idea", {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // status: {
    //   type: DataTypes.String,
    //   default: "public",
    //   enum: ["public", "private"],
    // },
  });
  return IdeaSchema;
};