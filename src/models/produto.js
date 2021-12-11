const Sequelize = require("sequelize");
const database = require("../database");

const Produto = database.define(
	"produto",
	{
		idproduto: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
			notEmpty: true,
			unique: {
				args: true,
				msg: "Esse protudo já existe no cadastro",
			},
			validate: {
				notEmpty: {
					args: true,
					msg: "Forneça o nome do produto",
				},
			},
		},
	},
	{
		freezeTableName: true,
	}
);

module.exports = Produto;
