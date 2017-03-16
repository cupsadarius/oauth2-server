module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Client', {
    id: {
      type: DataTypes.STRING(40),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING(40),
    secret: DataTypes.STRING(40),
    userId: DataTypes.STRING(40)
  }, {
    tableName: 'clients',
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: (models) => {

      },
    },
  });
};