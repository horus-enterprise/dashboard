var database = require("../database/config")

function listar() {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(nome, email, telefone, cnpj, cep, uf, cidade, bairro, logradouro, numero, uuid) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSupervisor():");
    var instrucao = `
        INSERT INTO empresa (razaoSocial, email, telefone, cnpj, cep, uf, cidade, bairro, lougadouro, numero, uuid) VALUES ('${nome}', '${email}', '${telefone}', '${cnpj}', '${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}', '${numero}', '${uuid}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    listar,
};