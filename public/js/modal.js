let modal = document.getElementById("modalDetalhes");
let spanFechar = document.getElementById("fecharModal");


function abrirModal(idMaquina) {
    modal.style.display = "flex";
    fetch(`/maquinas/listarDescComponentes/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        document.getElementById("hostnameModal").innerHTML = `${json[0].hostname}`;
                        document.getElementById("processadorModal").innerHTML = `Processador ${json[0].nomeCPU}`;
                        document.getElementById("memoriaModal").innerHTML = `Memória RAM - ${json[0].tamanhoRam}GB`;
                        document.getElementById("discoModal").innerHTML = `Disco ${json[0].modeloDisco} - ${json[0].tamanhoDisco}GB`;

                        drawChartProcessador7();
                        drawChartProcessadorTemp();
                        drawChartMemoria7(json[0].tamanhoRam);
                        drawChartMemoria24(json[0].tamanhoRam);
                        drawChartDisco30();
                        drawTableHistorico();
                    });
            }
        });

    fetch(`/hardwares/listarUsoDiscoAgora/${sessionStorage.getItem("fkEmpresa")}/${idMaquina}`)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(json => {
                        drawChartDiscoAgora(json[0].tamanhoDisco, json[0].disco);
                    });
            }
        });
}
spanFechar.onclick = () => {
    modal.style.display = "none";
    document.getElementById("tabelaHistorico").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ======================================= GRÁFICOS PROCESSADOR =======================================

google.charts.load('45', {
    packages: ['corechart', 'table']
});

function drawChartProcessador7() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\nCPU');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var y = 50;
    // fill with 30 rows of random data
    for (var i = 7; i >= 0; i--) {
        y += Math.ceil(Math.random() * 5) * Math.pow(-1, Math.ceil(Math.random() * 2));
        if (y < 0) {
            y = 10;
        }
        if (y > 100) {
            y = 90;
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


function drawChartProcessadorTemp() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Temperatura\nda CPU');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var y = 50;
    // fill with 30 rows of random data
    for (var i = 24; i >= 0; i--) {
        y += Math.ceil(Math.random() * 5) * Math.pow(-1, Math.ceil(Math.random() * 2));
        if (y < 0) {
            y = 10;
        }
        if (y > 100) {
            y = 90;
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


function drawChartMemoria7(tamanhoRam) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\nmemória');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    // fill with 30 rows of random data
    for (var i = 7; i >= 0; i--) {
        y = Math.random() * tamanhoRam;

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
            title: 'Média de uso (%)',
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


function drawChartMemoria24(tamanhoRam) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\nmemória');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var y = 8;
    // fill with 30 rows of random data
    for (var i = 24; i >= 0; i--) {
        y = Math.random() * tamanhoRam;

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

//  ======================================= GRÁFICOS DISCO =======================================


function drawChartDisco30() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'Uso da\ncapacidade');
    data.addColumn('number', 'color band 1');
    data.addColumn('number', 'color band 2');
    data.addColumn('number', 'color band 3');

    var y = 50;
    // fill with 30 rows of random data
    for (var i = 30; i >= 0; i--) {
        y += Math.ceil(Math.random() * 5) * Math.pow(-1, Math.ceil(Math.random() * 2));
        if (y < 0) {
            y = 10;
        }
        if (y > 100) {
            y = 90;
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