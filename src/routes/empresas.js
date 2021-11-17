var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/", function(req, res) {
    empresaController.testar(req, res);
});

router.get("/listar", function(req, res) {
    empresaController.listar(req, res);
});

router.post("/cadastrarEmpresa", function(req, res) {
    empresaController.cadastrarEmpresa(req, res);
});

module.exports = router;