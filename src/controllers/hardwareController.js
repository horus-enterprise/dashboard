var hardwareModel = require("../models/hardwareModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA hardwareController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listarUptime(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarUptime(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsoCPU7(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarUsoCPU7(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarTemperaturaCPU24(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarTemperaturaCPU24(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsoMemoria7(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarMemoria7(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsoMemoria24(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarUsoMemoria24(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsoDisco30(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarUsoDisco30(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarUsoDiscoAgora(req, res) {
    var id = req.params.idMaquina;
    var fkEmpresa = req.params.fkEmpresa;

    if (id == undefined) {
        res.status(400).send("ID da máquina está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {
        hardwareModel.listarUsoDiscoAgora(fkEmpresa, id)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao recuperar os dados da CPU! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listarUptime,
    listarUsoCPU7,
    listarTemperaturaCPU24,
    listarUsoMemoria7,
    listarUsoMemoria24,
    listarUsoDisco30,
    listarUsoDiscoAgora,
    testar
}