var database = require("../database/config")

function listar() {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(nome, email, telefone, cnpj, cep, uf, cidade, bairro, logradouro, numero) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSupervisor():", nome, email, senha, fkEmpresa);
    var instrucao = `
        INSERT INTO empresa (nmEmpresa, email, telefone, cnpj, cep, uf, cidade, bairro, logradouro, numero) VALUES ('${nome}', '${email}', '${telefone}', '${cnpj}', '${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}', '${numero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    listar,
};