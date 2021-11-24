//process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3000;

var app = express();

var indexRouter = require("./src/routes/index");
var funcionarioRouter = require("./src/routes/funcionarios");
var empresaRouter = require("./src/routes/empresas");
var maquinaRouter = require("./src/routes/maquinas");
var hardwareRouter = require("./src/routes/hardwares");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/funcionarios", funcionarioRouter);
app.use("/empresas", empresaRouter);
app.use("/maquinas", maquinaRouter);
app.use("/hardwares", hardwareRouter);

app.listen(PORTA, function() {
    console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", banco local (MySQL Workbench). \n
    \t\tSe "producao", banco remoto (SQL Server em nuvem Azure)`);
});
