const router = require("express").Router();
const { ProdutoController } = require("../controllers");
const { authMiddleware, adminMiddleware } = require("../middlewares");
const { create, update, remove, list } = new ProdutoController();

// a rota é validade por authMiddleware - precisa estar logado
// curl -X GET -d "offset=0&limit=4" http://localhost:3100/produto/list
router.get("/list", authMiddleware, list);

// a rota é validade por adminMiddleware - verifica se o usuário é admin
// curl -X POST -d "nome=Covid 1a dose" http://localhost:3100/produto/create
router.post("/create", adminMiddleware, create);

// curl -X PUT -d "idproduto=Covid dose única" http://localhost:3100/produto/update
router.put("/update", adminMiddleware, update);

// curl -X DELETE -d "idproduto=1" http://localhost:3100/produto/remove
router.delete("/remove", adminMiddleware, remove);

router.use((req, res) => {
	res.status(400).json({ error: ["Operação desconhecida com o produto"] });
});

module.exports = router;
