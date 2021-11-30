function isLogado() {
    if (sessionStorage.getItem("idSupervisor") == null || sessionStorage.getItem("nomeSupervisor") == null || sessionStorage.getItem("fkEmpresa") == null) {
        alert("Você não está logado. Faça seu login!");
        window.location.href = "./login.html";
    }
}

function sair() {
    sessionStorage.removeItem("idSupervisor");
    sessionStorage.removeItem("nomeSupervisor");
    sessionStorage.removeItem("fkEmpresa");
    window.location.href = "./login.html";
}