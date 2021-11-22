var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA maquinaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        maquinaModel.listar(fkEmpresa)
            .then(function(resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function(erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarDescComponentes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var id = req.params.idMaquina;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        maquinaModel.listarDescComponentes(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados dos componentes! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listar,
    listarDescComponentes,
    testar
}