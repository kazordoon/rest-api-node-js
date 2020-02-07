const { Model, DataTypes } = require('sequelize')

class Produto extends Model {
  static init (sequelize) {
    super.init({
      id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      preco: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagem_produto: DataTypes.STRING
    }, { sequelize, modelName: 'produtos' })
  }

  static associate (model) {
    this.hasOne(model, { foreignKey: 'id_produto', as: 'pedido' })
  }
}

module.exports = Produto
