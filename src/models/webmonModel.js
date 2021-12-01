var database = require("../database/config");

function listarHistorico(fkFuncionario, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkFuncionario);
    var date1 = new Date();
    date1.setHours(date1.getHours() - 24);
    var date2 = new Date();
    // date2.setHours(date2.getHours() - 3);
    var instrucao = `
        SELECT url, dataHora, nomeFuncionario FROM monitoramentoWeb inner join funcionario on fkFuncionario = idFuncionario where fkFuncionario = ${fkFuncionario} and fkMaquina = ${idMaquina} and dataHora >= '${date1.toISOString()}' and dataHora <= '${date2.toISOString()}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarHistoricoDatas(fkFuncionario, dataInicio, dataTermino) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkFuncionario);
    var instrucao = `
        SELECT nomeFuncionario, hostname, url, dataHora FROM funcionario func inner join monitoramentoWeb webmon on webmon.fkFuncionario = func.idFuncionario inner join maquina maq on maq.idMaquina = webmon.fkMaquina where fkFuncionario = ${fkFuncionario} and dataHora >= '${dataInicio.toISOString()}' and dataHora <= '${dataTermino.toISOString()}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarHistorico(fkFuncionario, idMaquina, url, dataHora) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkFuncionario);
    var instrucao = `
        INSERT INTO monitoramentoWeb (fkFuncionario, fkMaquina, url, dataHora) values (${fkFuncionario}, ${idMaquina}, '${url}', '${dataHora}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarHistorico,
    listarHistoricoDatas,
    cadastrarHistorico
};