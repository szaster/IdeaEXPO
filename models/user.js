// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// const bcrypt = require("bcryptjs");

// Creating our User model

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  });

  User.associate = function (models) {
    //associating user with his posts
    User.hasMany(models.idea, {
      onDelete: "cascade",
    });
  };
  return User;
};