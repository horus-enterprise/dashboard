var database = require("../database/config")

function listarUptime(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT uptime FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} limit 1 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoCPU7(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT avg(cpuUso) FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATE(dataHora) limit 8 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTemperaturaCPU24(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(cpuTemperatura) FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by HOUR(dataHora) limit 25 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoMemoria7(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(ram) FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATE(dataHora) limit 31 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoMemoria24(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(ram) FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by HOUR(dataHora) limit 25 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoDisco30(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(disco) FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATE(dataHora) limit 31 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoDiscoAgora(fkEmpresa, idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(disco) FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATE(dataHora) limit 1 order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarUptime,
    listarUsoCPU7,
    listarTemperaturaCPU24,
    listarUsoMemoria7,
    listarUsoMemoria24,
    listarUsoDisco30,
    listarUsoDiscoAgora
};