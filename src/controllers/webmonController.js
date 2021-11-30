var webmonModel = require("../models/webmonModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA webmonController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listarHistorico(req, res) {
    var id = req.params.idMaquina;
    var fkFuncionario = req.params.fkFuncionario;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkFuncionario == undefined) {
        res.status(400).send("Sua fkFuncionario está undefined!");
    } else {
        webmonModel.listarHistorico(fkFuncionario, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados do histórico web! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarHistorico(req, res) {
    var id = req.body.idMaquina;
    var fkFuncionario = req.body.idFuncionario;
    var url = req.body.url;
    var dataHora = req.body.dataHora;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkFuncionario == undefined) {
        res.status(400).send("Sua fkFuncionario está undefined!");
    } else {
        webmonModel.cadastrarHistorico(fkFuncionario, id, url, dataHora)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao cadastrar os dados do histórico web! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listarHistorico,
    cadastrarHistorico,
    testar
}