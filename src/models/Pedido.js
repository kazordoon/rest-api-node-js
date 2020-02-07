const { Model, DataTypes } = require('sequelize')

class Pedido extends Model {
  static init (sequelize) {
    super.init({
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, { sequelize, modelName: 'pedidos' })
  }

  static associate (model) {
    this.belongsTo(model, { foreignKey: 'id_produto', as: 'produto' })
  }
}

module.exports = Pedido
