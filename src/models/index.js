//importa o arquivo database/index.js
const database = require("../database");

const ProdutoModel = require("./produto");
const RegistroModel = require("./registro");


ProdutoModel.hasMany(RegistroModel, {
	foreignKey: {
		name: "idproduto",
		allowNull: false,
	},
	sourceKey: "idproduto",
	onDelete: "restrict",
	onUpdate: "cascade",
	hooks: true, //usado para forçar o cascade no onDelete
});
RegistroModel.belongsTo(ProdutoModel, {
	foreignKey: "idproduto",
	targetKey: "idproduto",
});

//cria as tabelas no SGBD se elas não existirem
database.sync();

// importa e exporta
module.exports = {
	UsuarioModel: require("./usuario"),
	ProdutoModel: require("./produto"),
	RegistroModel: require("./registro"),

};
