var database = require("../database/config")

function listarUptime(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT uptime FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} order by dataHora desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoCPU7(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT avg(cpuUso) as 'usoCPU', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by MONTH(dataHora), DATE(dataHora) order by dataHora desc limit 8;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTemperaturaCPU24(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(cpuTemperatura) as 'temperatura', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by MONTH(dataHora), DAY(dataHora), HOUR(dataHora) order by dataHora desc limit 25;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoMemoria7(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT avg(ram) as 'ram', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by MONTH(dataHora), DATE(dataHora) order by dataHora desc limit 31;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoMemoria24(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(ram) as 'ram', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by MONTH(dataHora), DAY(dataHora), HOUR(dataHora) order by dataHora desc limit 25;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoDisco30(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT max(disco) as 'uso', max(dataHora) as 'dataHora' FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} group by MONTH(dataHora), DATE(dataHora) order by dataHora desc limit 31;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsoDiscoAgora(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT disco FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} order by dataHora desc limit 1;
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