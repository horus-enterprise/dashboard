var database = require("../database/config")

function listarUptime(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 1 uptime FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoCPU7(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 8 avg(cpuUso) as 'usoCPU', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATEPART(MONTH, dataHora), DATEPART(DAY, dataHora) order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTemperaturaCPU24(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 25 max(cpuTemperatura) as 'temperatura', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATEPART(MONTH, dataHora), DATEPART(DAY, dataHora), DATEPART(HOUR, dataHora) order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoMemoria7(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 31 avg(ram) as 'ram', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATEPART(MONTH, dataHora), DATEPART(DAY, dataHora) order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoMemoria24(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 25 max(ram) as 'ram', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATEPART(MONTH, dataHora), DATEPART(DAY, dataHora), DATEPART(HOUR, dataHora) order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoDisco30(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 31 max(disco) as 'uso', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by DATEPART(MONTH, dataHora), DATEPART(DAY, dataHora) order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoDiscoAgora(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 1 disco FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} order by dataHora desc;
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