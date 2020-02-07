const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

class Usuario extends Model {
  static init (sequelize) {
    super.init({
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize, modelName: 'usuarios' })

    this.beforeCreate(async usuario => {
      const senhaComHash = await bcrypt.hash(usuario.senha, 10)
      usuario.senha = senhaComHash
    })
  }
}

module.exports = Usuario
