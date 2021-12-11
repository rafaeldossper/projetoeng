const { ProdutoModel, RegistroModel } = require("../models");

class ProdutoController {
	async create(req, res) {
		let { nome } = req.body;
		nome = (nome || "").toString().trim();
		if (nome === "") {
			return res.status(400).json({ error: ["Forneça o nome do produto"] });
		}

		return await ProdutoModel.create({ nome })
			.then((r) => {
				const { idproduto } = r.get();
				return res.status(200).json({ idproduto, nome });
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async update(req, res) {
		let { idproduto, nome } = req.body;
		idproduto = (idproduto || "").toString().replace(/[^\d]+/g, "");
		nome = (nome || "").toString().trim();
		if (idproduto === "") {
			return res
				.status(400)
				.json({ error: ["Forneça a identificação do produto"] });
		}

		return await ProdutoModel.findOne({ where: { idproduto } })
			.then(async (produto) => {
				if (produto) {
					await produto.update({ nome });
					return res.status(200).json({ idproduto, nome });
				}
				return res.status(400).json({ error: ["Produto não identificado"] });
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async remove(req, res) {
		let { idproduto } = req.body;
		idproduto = (idproduto || "").toString().replace(/[^\d]+/g, "");
		if (idproduto === "") {
			return res
				.status(400)
				.json({ error: ["Forneça a identificação da produto"] });
		}

		return await ProdutoModel.findOne({ where: { idproduto } })
			.then(async (produto) => {
				if (produto !== null) {
					const registro = await RegistroModel.findOne({ where: { idproduto } });
					if (!registro) {
						await produto.destroy();
						return res.status(200).json({ idproduto });
					} else {
						return res.status(400).json({
							error: ["Não pode ser excluída por estar em algum registro"],
						});
					}
				} else {
					return res.status(400).json({ error: ["Registro inexistente"] });
				}
			})
			.catch((err) => {
				try {
					return res.status(400).json({
						error: err.errors.map((item) => item.message),
						type: "validation",
					});
				} catch (e) {
					return res.status(400).json({ error: [e.message] });
				}
			});
	}

	async list(req, res) {
		let { limit, offset } = req.body;
		return await ProdutoModel.findAndCountAll({
			attributes: ["idproduto", "nome"],
			order: [["nome", "ASC"]],
			offset,
			limit,
		})
			.then((produtos) => {
				return res.status(200).json({
					produtos: produtos.rows.map((item) => item.get()),
					count: produtos.count,
				});
			})
			.catch((e) => {
				return res.status(400).json({ error: [e.message] });
			});
	}
}

module.exports = ProdutoController;
