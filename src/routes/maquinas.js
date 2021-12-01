var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function(req, res) {
    maquinaController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function(req, res) {
    maquinaController.listar(req, res);
});

router.get("/listar/:fkEmpresa/:hostname", function(req, res) {
    maquinaController.listarPorNome(req, res);
});

router.get("/listarDescComponentes/:fkEmpresa/:idMaquina", function(req, res) {
    maquinaController.listarDescComponentes(req, res);
});

module.exports = router;