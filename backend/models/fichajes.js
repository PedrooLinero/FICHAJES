const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registros', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    centro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idsap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trabajador: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contratos_laborales: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    planificadas: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    realizadas: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    presencia: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    absentismo: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    ausentismo: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    sindicales: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    vacaciones: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    vacaciones_rh: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    complementarias: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    especiales: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    ildi: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    justificacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'registros',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" }
        ]
      }
    ]
  });
};
