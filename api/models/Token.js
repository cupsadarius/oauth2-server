module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Token', {
    id: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
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
    tableName: 'tokens',
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: (models) => {

      },
    }
  });
};