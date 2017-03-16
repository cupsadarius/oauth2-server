module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Code', {
    id: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    redirectUri: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
    }
  }, {
    tableName: 'codes',
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: (models) => {

      },
    }
  });
};