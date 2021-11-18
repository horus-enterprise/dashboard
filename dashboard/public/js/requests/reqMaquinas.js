function getMaquinas(fkEmpresa) {
    fetch(`/maquinas/listar/${fkEmpresa}`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then(json => {
                    return json;
                });
            }
        });
}