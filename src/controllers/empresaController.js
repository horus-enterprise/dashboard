var empresaModel = require("../models/empresaModel");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

async function mandarEmail(email, uuid) {

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: "212-2a-grupo7@bandtec.com.br",
            pass: "#Gfgrupo7"
        }
    });

    transporter.sendMail({
        from: '"Horus Enterprise" <212-2a-grupo7@bandtec.com.br>',
        to: `${email}`,
        subject: "Cadastro da sua empresa foi realizado",
        text: `Você acaba de se cadastrar no nosso sistema Horus. Aqui está seu código para cadastrar novos usuários: ${uuid}`
    });
}

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
    var nome = req.body.nomeHTML;
    var email = req.body.emailHTML;
    var telefone = req.body.telefoneHTML;
    var cnpj = req.body.cnpjHTML;
    var cep = req.body.cepHTML;
    var uf = req.body.ufHTML;
    var cidade = req.body.cidadeHTML;
    var bairro = req.body.bairroHTML;
    var logradouro = req.body.logradouroHTML;
    var numero = req.body.numeroHTML;
    var uuid = uuidv4();

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
        empresaModel.cadastrarEmpresa(nome, email, telefone, cnpj, cep, uf, cidade, bairro, logradouro, numero, uuid)
            .then(
                function(resultado) {
                    res.json(resultado);
                    mandarEmail(email, uuid).catch(console.error);
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