var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function(req, res) {
    maquinaController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function(req, res) {
    maquinaController.listar(req, res);
});

router.get("/listarCPU/:fkEmpresa/:idMaquina", function(req, res) {
    maquinaController.listarCPU(req, res);
});

router.get("/listarDisco/:fkEmpresa/:idMaquina", function(req, res) {
    maquinaController.listarDisco(req, res);
});

module.exports = router;