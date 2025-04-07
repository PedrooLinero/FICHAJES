var DataTypes = require("sequelize").DataTypes;
var _registros = require("./registros");

function initModels(sequelize) {
  var registros = _registros(sequelize, DataTypes);

  return {
    registros,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
