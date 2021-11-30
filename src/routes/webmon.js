var express = require("express");
var router = express.Router();

var webmonController = require("../controllers/webmonController");

router.get("/", function(req, res) {
    webmonController.testar(req, res);
});

router.get("/listarHistorico/:fkFuncionario/:idMaquina", function(req, res) {
    webmonController.listarHistorico(req, res);
});

router.post("/listarHistoricoDatas/", function(req, res) {
    webmonController.listarHistoricoDatas(req, res);
});

router.post("/cadastrarHistorico", function(req, res) {
    webmonController.cadastrarHistorico(req, res);
});

module.exports = router;