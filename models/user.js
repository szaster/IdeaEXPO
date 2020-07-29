// Creating our User model

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
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
