let modal = document.getElementById("modalDetalhes");
let spanFechar = document.getElementById("fecharModal");

var uptimeInterval;

function abrirModal(idMaquina) {
    modal.style.display = "flex";
    var uptime;
    var segundos;
    var voltas = 0;
    var tamanhoRam;
    var tamanhoDisco;
    fetch(`/maquinas/listarDescComponentes/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        document.getElementById("hostnameModal").innerHTML = `${json[0].hostname}`;
                        document.getElementById("processadorModal").innerHTML = `Processador ${json[0].nomeCPU}`;
                        document.getElementById("memoriaModal").innerHTML = `Memória RAM - ${json[0].tamanhoRam}GB`;
                        document.getElementById("discoModal").innerHTML = `Disco ${json[0].modeloDisco} - ${json[0].tamanhoDisco}GB`;

                        tamanhoRam = json[0].tamanhoRam;
                        tamanhoDisco = json[0].tamanhoDisco;

                        drawTableHistorico();
                    });
            }
        });

    fetch(`/hardwares/listarUptime/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        uptime = json[0].uptime;
                        document.getElementById("lblUptime").innerHTML = `${("0" + Math.floor(uptime / 3600)).slice(-2)}:${("0" + Math.floor(uptime % 3600 / 60)).slice(-2)}:${("0" + Math.floor(uptime % 3600 % 60)).slice(-2)}`;
                        uptimeInterval = setInterval(() => {
                            if (voltas == 0) {
                                segundos = uptime + 1;
                            }
                            var h = Math.floor(segundos / 3600);
                            var m = Math.floor(segundos % 3600 / 60);
                            var s = Math.floor(segundos % 3600 % 60);

                            document.getElementById("lblUptime").innerHTML = `${("0" + h).slice(-2)}:${("0" + m).slice(-2)}:${("0" + s).slice(-2)}`;
                            segundos++;
                            voltas++;
                        }, 1000);
                    });
            }
        });

    fetch(`/hardwares/listarUsoCPU7/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartProcessador7(json);
                    });
            }
        });

    fetch(`/hardwares/listarTemperaturaCPU24/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartProcessadorTemp(json);
                    });
            }
        });

    fetch(`/hardwares/listarUsoMemoria7/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartMemoria7(tamanhoRam, json);
                    });
            }
        });

    fetch(`/hardwares/listarUsoMemoria24/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartMemoria24(tamanhoRam, json);
                    });
            }
        });

    fetch(`/hardwares/listarUsoDisco30/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartDisco30(json);
                    });
            }
        });

    fetch(`/hardwares/listarUsoDiscoAgora/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartDiscoAgora(tamanhoDisco, json[0].disco);
                    });
            }
        });
}
spanFechar.onclick = () => {
    fecharModal();
}

window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal();
    }
}

function fecharModal() {
    modal.style.display = "none";
    document.getElementById("tabelaHistorico").style.display = "none";
    clearInterval(uptimeInterval);
    document.getElementById("hostnameModal").innerHTML = `{hostname}`;
    document.getElementById("lblUptime").innerHTML = `00:00:00`;
    document.getElementById("processadorModal").innerHTML = `Processador`;
    document.getElementById("memoriaModal").innerHTML = `Memória RAM`;
    document.getElementById("discoModal").innerHTML = `Disco`;
}

// ======================================= GRÁFICOS PROCESSADOR =======================================

google.charts.load('45', {
    packages: ['corechart', 'table']
});

function drawChartProcessador7(json) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\nCPU');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var j = 0;
    var y;
    for (var i = 0; i <= 7; i++) {
        var date = new Date();
        date.setDate(date.getDate() - i);

        if (j != json.length) {
            if (date.getDate() == new Date(json[j].dataHora).getDate()) {
                y = json[j].usoCPU;
                j++;
            } else {
                y = 0;
            }
        } else {
            y = 0;
        }

        data.addRow([{
            v: i,
            f: (i != 0) ? `${i} dias atrás` : 'Hoje'
        }, {
            v: y,
            f: `${y}%`
        }, 75, 15, 10]);
    }

    var chart = new google.visualization.LineChart(document.getElementById('graficoProcessador7'));

    chart.draw(data, {
        height: 224,
        width: 432,
        chartArea: {
            width: 272,
            left: 56
        },
        title: 'Média de uso da CPU nos últimos 7 dias',
        titleTextStyle: {
            fontName: 'Quantico',
            color: '#2c2c2c',
            fontSize: 15
        },
        legend: {
            textStyle: {
                fontName: 'Changa',
                color: '#2c2c2c',
            }
        },
        isStacked: true,
        vAxis: {
            title: 'Média de uso (%)',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [0, 25, 50, 75, 100]
        },
        hAxis: {
            direction: -1,
            minValue: 7,
            maxValue: 1,
            title: 'Dias atrás',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [7, 6, 5, 4, 3, 2, 1, 0]
        },
        series: {
            0: {
                type: 'line',
                color: '#000'
            },
            1: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#0fa958'

            },
            2: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#ffc700'
            },
            3: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#f21e1e'
            }
        }
    });
}


function drawChartProcessadorTemp(json) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Temperatura\nda CPU');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var j = 0;
    var y;
    for (var i = 0; i <= 24; i++) {
        var date = new Date();
        date.setHours(date.getHours() - i);

        if (j != json.length) {
            if (date.getHours() == new Date(json[j].dataHora).getHours()) {
                y = json[j].temperatura;
                j++;
            } else {
                y = 0;
            }
        } else {
            y = 0;
        }

        data.addRow([{
            v: i,
            f: (i != 0) ? `${i} horas atrás` : 'Agora'
        }, {
            v: y,
            f: `${y}°C`
        }, 75, 15, 10]);
    }

    var chart = new google.visualization.LineChart(document.getElementById('graficoProcessadorTemp'));

    chart.draw(data, {
        height: 224,
        width: 432,
        chartArea: {
            width: 272,
            left: 56
        },
        title: 'Temperatura da CPU nas últimas 24 horas',
        titleTextStyle: {
            fontName: 'Quantico',
            color: '#2c2c2c',
            fontSize: 15
        },
        legend: {
            textStyle: {
                fontName: 'Changa',
                color: '#2c2c2c',
            }
        },
        isStacked: true,
        vAxis: {
            title: 'Temperatura atingida (°C)',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [0, 25, 50, 75, 100]
        },
        hAxis: {
            direction: -1,
            minValue: 24,
            maxValue: 0,
            title: 'Horas atrás',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [24, 21, 18, 15, 12, 9, 6, 3, 0]
        },
        series: {
            0: {
                type: 'line',
                color: '#000'
            },
            1: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#0fa958'

            },
            2: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#ffc700'
            },
            3: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#f21e1e'
            }
        }
    });
}



// ======================================= GRÁFICOS MEMÓRIA =======================================


function drawChartMemoria7(tamanhoRam, json) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\nmemória');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var j = 0;
    var y;
    for (var i = 0; i <= 7; i++) {
        var date = new Date();
        date.setDate(date.getDate() - i);

        if (j != json.length) {
            if (date.getDate() == new Date(json[j].dataHora).getDate()) {
                y = (tamanhoRam * json[j].ram) / 100;
                j++;
            } else {
                y = 0;
            }
        } else {
            y = 0;
        }

        data.addRow([{
            v: i,
            f: (i != 0) ? `${i} dias atrás` : 'Hoje'
        }, {
            v: y,
            f: `${y.toFixed(2)}GB`
        }, (tamanhoRam * 0.75), (tamanhoRam * 0.15), (tamanhoRam * 0.1)]);
    }

    var chart = new google.visualization.LineChart(document.getElementById('graficoMemoria7'));

    chart.draw(data, {
        height: 224,
        width: 432,
        chartArea: {
            width: 272,
            left: 56
        },
        title: 'Média de uso da memória nos últimos 7 dias',
        titleTextStyle: {
            fontName: 'Quantico',
            color: '#2c2c2c',
            fontSize: 15
        },
        legend: {
            textStyle: {
                fontName: 'Changa',
                color: '#2c2c2c',
            }
        },
        isStacked: true,
        vAxis: {
            minValue: 0,
            maxValue: tamanhoRam,
            title: 'Média de uso (GB)',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [0, (tamanhoRam * 0.25), (tamanhoRam * 0.5), (tamanhoRam * 0.75), tamanhoRam]
        },
        hAxis: {
            direction: -1,
            minValue: 7,
            maxValue: 1,
            title: 'Dias atrás',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [7, 6, 5, 4, 3, 2, 1, 0]
        },
        series: {
            0: {
                type: 'line',
                color: '#000'
            },
            1: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#0fa958'

            },
            2: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#ffc700'
            },
            3: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#f21e1e'
            }
        }
    });
}


function drawChartMemoria24(tamanhoRam, json) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\nmemória');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var j = 0;
    var y;
    for (var i = 0; i <= 24; i++) {
        var date = new Date();
        date.setHours(date.getHours() - i);

        if (j != json.length) {
            if (date.getHours() == new Date(json[j].dataHora).getHours()) {
                y = (tamanhoRam * json[j].ram) / 100;
                j++;
            } else {
                y = 0;
            }
        } else {
            y = 0;
        }

        data.addRow([{
            v: i,
            f: (i != 0) ? `${i} horas atrás` : 'Agora'
        }, {
            v: y,
            f: `${y.toFixed(2)}GB`
        }, (tamanhoRam * 0.75), (tamanhoRam * 0.15), (tamanhoRam * 0.1)]);
    }

    var chart = new google.visualization.LineChart(document.getElementById('graficoMemoria24'));

    chart.draw(data, {
        height: 224,
        width: 432,
        chartArea: {
            width: 272,
            left: 56
        },
        title: 'Uso da memória nas últimas 24 horas',
        titleTextStyle: {
            fontName: 'Quantico',
            color: '#2c2c2c',
            fontSize: 15
        },
        legend: {
            textStyle: {
                fontName: 'Changa',
                color: '#2c2c2c',
            }
        },
        isStacked: true,
        vAxis: {
            minValue: 0,
            maxValue: tamanhoRam,
            title: 'Memória utilizada (GB)',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [0, (tamanhoRam * 0.25), (tamanhoRam * 0.5), (tamanhoRam * 0.75), tamanhoRam],
        },
        hAxis: {
            direction: -1,
            minValue: 24,
            maxValue: 1,
            title: 'Horas atrás',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [24, 21, 18, 15, 12, 9, 6, 3, 0]
        },
        series: {
            0: {
                type: 'line',
                color: '#000'
            },
            1: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#0fa958'

            },
            2: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#ffc700'
            },
            3: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#f21e1e'
            }
        }
    });
}

//  ======================================= GRÁFICOS DISCO =======================================


function drawChartDisco30(json) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\ncapacidade');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var j = 0;
    var y;
    for (var i = 0; i <= 30; i++) {
        var date = new Date();
        date.setDate(date.getDate() - i);

        if (j != json.length) {
            if (date.getDate() == new Date(json[j].dataHora).getDate()) {
                y = json[j].uso;
                j++;
            } else {
                y = 0;
            }
        } else {
            y = 0;
        }

        data.addRow([{
            v: i,
            f: (i != 0) ? `${i} dias atrás` : 'Hoje'
        }, {
            v: y,
            f: `${y}%`
        }, 75, 15, 10]);
    }

    var chart = new google.visualization.LineChart(document.getElementById('graficoDisco30'));

    chart.draw(data, {
        height: 224,
        width: 432,
        chartArea: {
            width: 272,
            left: 56
        },
        title: 'Uso da capacidade do disco nos últimos 30 dias',
        titleTextStyle: {
            fontName: 'Quantico',
            color: '#2c2c2c',
            fontSize: 15
        },
        legend: {
            textStyle: {
                fontName: 'Changa',
                color: '#2c2c2c',
            }
        },
        isStacked: true,
        vAxis: {
            title: 'Espaço utilizado (%)',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [0, 25, 50, 75, 100]
        },
        hAxis: {
            direction: -1,
            minValue: 7,
            maxValue: 1,
            title: 'Dias atrás',
            titleTextStyle: {
                fontName: 'Changa',
                color: '#6b6b6b'
            },
            ticks: [30, 25, 20, 15, 10, 5, 0]
        },
        series: {
            0: {
                type: 'line',
                color: '#000'
            },
            1: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#0fa958'

            },
            2: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#ffc700'
            },
            3: {
                lineWidth: 0,
                type: 'area',
                visibleInLegend: false,
                enableInteractivity: false,
                color: '#f21e1e'
            }
        }
    });
}


function drawChartDiscoAgora(tamanhoDisco, uso) {
    var valorBruto = (tamanhoDisco * uso) / 100;
    var diferenca = tamanhoDisco - valorBruto;
    var data = google.visualization.arrayToDataTable([
        ['Espaço', 'GB'],
        ['Espaço utilizado', {
            v: valorBruto,
            f: `${valorBruto}GB`
        }],
        ['Espaço livre', {
            v: diferenca,
            f: `${diferenca}GB`
        }]
    ]);

    var porcentagem = data.Tf[0].c[1].v * 100 / (data.Tf[0].c[1].v + data.Tf[1].c[1].v);
    if (porcentagem < 75) {
        var cor = '#0fa958'
    } else if (porcentagem < 90) {
        var cor = '#ffc700'
    } else {
        var cor = '#f21e1e'
    }

    var options = {
        height: 224,
        width: 432,
        title: 'Uso atual do armazenamento do disco',
        titleTextStyle: {
            fontName: 'Quantico',
            color: '#2c2c2c',
            fontSize: 15
        },
        legend: {
            textStyle: {
                fontName: 'Changa',
                color: '#2c2c2c',
            }
        },
        fontName: 'Changa',
        fontSize: 12,
        pieSliceBorderColor: 'none',
        slices: {
            0: {
                color: cor,
                textStyle: {
                    color: 'white'
                }
            },
            1: {
                color: '#e5e5e5',
                textStyle: {
                    color: '#2c2c2c'
                }
            }
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficoDiscoAgora'));
    chart.draw(data, options);
}



//  ======================================= GRÁFICO HISTÓRICO =======================================


function drawTableHistorico() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Site');
    data.addColumn('string', 'Tempo');
    data.addColumn('string', 'Último Acesso');
    data.addRows([
        ['Facebook', '01:22:31', '09/11/21 - 13:02:57'],
        ['Instagram', '01:22:31', '09/11/21 - 13:02:57'],
        ['Twitter', '01:22:31', '09/11/21 - 13:02:57']
    ]);

    var table = new google.visualization.Table(document.getElementById('tabelaHistorico'));

    table.draw(data, {
        height: 128,
        width: '100%',
    });
}