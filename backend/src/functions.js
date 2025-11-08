// Arquivo que guarda algumas funções usadas

export function bebidasVetor(req_body) {

    let v = [];

    if (Array.isArray(req_body)) {
        v = req_body.map((b) => {
            return [
                b.beb_nome,
                b.qtde,
                b.preco_uni,
                b.volume,
                b.tipo,
                b.forn_cod,
                b.marca
            ];
        });
    }
    else {
        for (const chave in req_body) {
            v.push(req_body[chave]);
        }
    }

    console.log(v);

    return v;
}

export function fornVetor(req_body) {

    let v = [];

    if (Array.isArray(req_body)) {
        v = req_body.map((b) => {
            return [
                b.beb_nome,
                b.qtde,
                b.preco_uni,
                b.volume,
                b.tipo,
                b.forn_cod,
                b.marca
            ];
        });
    }
    else {
        for (const chave in req_body) {
            v.push(req_body[chave]);
        }
    }

    console.log(v);

    return v;
}
