var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");

router.get("/", function(req, res) {
    hardwareController.testar(req, res);
});

router.get("/listarUptime/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarUptime(req, res);
});

router.get("/listarUsoCPU7/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarUsoCPU7(req, res);
});

router.get("/listarTemperaturaCPU24/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarTemperaturaCPU24(req, res);
});

router.get("/listarUsoMemoria7/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarUsoMemoria7(req, res);
});

router.get("/listarUsoMemoria24/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarUsoMemoria24(req, res);
});

router.get("/listarUsoDisco30/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarUsoDisco30(req, res);
});

router.get("/listarUsoDiscoAgora/:fkEmpresa/:idMaquina", function(req, res) {
    hardwareController.listarUsoDiscoAgora(req, res);
});

module.exports = router;