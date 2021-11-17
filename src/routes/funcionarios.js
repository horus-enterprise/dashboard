var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/", function(req, res) {
    funcionarioController.testar(req, res);
});

router.get("/listar", function(req, res) {
    funcionarioController.listar(req, res);
});

router.post("/cadastrarSupervisor", function(req, res) {
    funcionarioController.cadastrarSupervisor(req, res);
});

router.post("/cadastrarOperador/:fkEmpresa/:fkSupervisor", function(req, res) {
    funcionarioController.cadastrarOperador(req, res);
});

module.exports = router;