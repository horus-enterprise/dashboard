var empresaModel = require("../models/empresaModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA empresaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    empresaModel.listar()
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

function cadastrarEmpresa(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var cnpj = req.body.cnpj;
    var cep = req.body.cep;
    var uf = req.body.uf;
    var cidade = req.body.cidade;
    var bairro = req.body.bairro;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Seu UF está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else {
        empresaModel.cadastrarEmpresa(nome, email, telefone, cnpj, cep, uf, cidade, bairro, logradouro, numero)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarEmpresa,
    listar,
    testar
}