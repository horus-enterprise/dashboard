var database = require("../database/config")

function listar(fkEmpresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var date = new Date();
    date.setHours(date.getHours() - 3);
    date.setSeconds(date.getSeconds() - 15);
    var instrucao = `
        SELECT idMaquina, hostname, cpuUso, disco, ram, max(dataHora) as 'dataHora' FROM maquina inner join monitoramentoHardware on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and dataHora >= '${date.toISOString()}' group by idMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDescComponentes(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarCPU()", fkEmpresa, idMaquina);
    var instrucao = `
        SELECT hostname, nomeCPU, modeloDisco, tamanhoDisco, tamanhoRam FROM maquina where fkEmpresa = ${fkEmpresa} and idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    listarDescComponentes,
    listar
};