var database = require("../database/config")

function listarUptime(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var instrucao = `
        SELECT top 1 uptime FROM monitoramentoHardware inner join maquina on fkMaquina = idMaquina where fkEmpresa = ${fkEmpresa} and fkMaquina = ${idMaquina} order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTudoDatas(fkFuncionario, dataInicio, dataTermino) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT nomeFuncionario, hostname, cpuUso, disco, ram, dataHora FROM maquina maq inner join monitoramentoHardware hardmon on hardmon.fkMaquina = maq.idMaquina inner join funcionario func on func.idFuncionario = hardmon.fkFuncionario where fkFuncionario = ${fkFuncionario} and dataHora >= '${dataInicio.toISOString()}' and dataHora <= '${dataTermino.toISOString()}';
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

function listarTempoLogado(fkEmpresa, idMaquina) {
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", fkEmpresa);
    var dateNow = new Date();
    // dateNow.setHours(dateNow.getHours() - 3);
    dateNow.setSeconds(dateNow.getSeconds() - 15);
    var date1 = new Date();
    date1.setHours(-3);
    date1.setMinutes(0);
    date1.setSeconds(0);
    var date2 = new Date();
    // date2.setHours(date2.getHours() - 3);
    var instrucao = `
        SELECT top 1 nomeFuncionario, min(dataHora) as 'min', (select max(dataHora) from monitoramentoHardware where fkFuncionario = (select idFuncionario from funcionario inner join monitoramentoHardware on fkFuncionario = idFuncionario where fkMaquina = ${idMaquina} and dataHora >= '${dateNow.toISOString()}') and dataHora <= '${date2.toISOString()}') as 'max' FROM monitoramentoHardware hardmon inner join funcionario func on hardmon.fkFuncionario = func.idFuncionario inner join maquina maq on maq.idMaquina = hardmon.fkMaquina where maq.fkEmpresa = ${fkEmpresa} and hardmon.fkMaquina = ${idMaquina} and hardmon.fkFuncionario = (
            select idFuncionario from funcionario inner join monitoramentoHardware on fkFuncionario = idFuncionario where fkMaquina = ${idMaquina} and dataHora >= '${dateNow.toISOString()}') and dataHora >= '${date1.toISOString()}' and dataHora <= '${date2.toISOString()}' group by nomeFuncionario, dataHora, dataHora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarTudoDatas,
    listarUptime,
    listarUsoCPU7,
    listarTemperaturaCPU24,
    listarUsoMemoria7,
    listarUsoMemoria24,
    listarUsoDisco30,
    listarUsoDiscoAgora,
    listarTempoLogado
};