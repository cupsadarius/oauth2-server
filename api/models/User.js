module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.STRING(40),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(32),
      unique: true,
      allowNull: false,
    },
    firstName: DataTypes.STRING(32),
    lastName: DataTypes.STRING(32),
    password: DataTypes.STRING(40),
    salt: DataTypes.STRING(40),
    scope: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: (models) => {

      },
    },
  });
};