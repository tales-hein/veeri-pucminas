var db_consultas_inicial = {
    "data": [
        {
            "id": 0,
            "link": "",
            "media": "",
            "somanotas": 0,
            "data": "",
            "status": "",
            "consultas": 0
        }
    ]
}

var db = JSON.parse(localStorage.getItem('db_consulta'));
if (!db) {
    db = db_consultas_inicial;
};

let linkConsulta = "";
let statusConsulta = "";

$(document).ready(function () {
    let url = window.location.href;
    let params = (new URL(url)).searchParams;
    statusConsulta = params.get('result')
    linkConsulta = params.get('link');
    $("#link").val(linkConsulta);
    $("#link-noticia").val(linkConsulta);
    carregarResultado(statusConsulta);
})

//Carregar resultado de pesquisa
function carregarResultado(status) {
    switch (status) {
        //caso o resultado dar verdadeiro
        case 'v':
            $(".content").append(
                "<div class='card'>\
                    <div class='card-header'>\
                        <h1>\
                            Essa notícia é <span style='color: #198754;font-weight: 600;\
                            font-size: 1.3rem'>verdadeira</span>!\
                            <br><br>\
                        </h1>\
                        <h2>\
                            Nosso algoritmo de avaliação de veracidade identificou o link enviado\
                            como link que direciona o usuário à notícia verdadeira.\
                            <br><br>\
                        </h2>\
                    </div>\
                    <form action=''>\
                        <input type='hidden' id='link' value=''>\
                        <div class='card-footer'>\
                            <h2>\
                                <span style='font-weight: 600;'>Mas e o que você acha? O quanto você acha que essa notícia é verdadeira?</span>\
                                <br>\
                                <span style='font-size:0.9rem;'>(Indique o que pensa com uma nota de 1 a 5. Com a nota baixa indicando que considera a notícia falsa e uma nota maior\
                                sinaliza que você tende a pensar que a notícia é verdadeira)</span>\
                                <br>\
                            </h2>\
                        </div>\
                        <input type='hidden' id='avaliacao' value=''>\
                    </form>\
                    <div class='avaliacao'>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                    </div>\
                    <div class='wrapper-btns'>\
                        <section class='btn-container'>\
                            <button class='avaliar' id='avaliar' onclick='gravarConsulta()'>Avaliar</button>\
                            <button class='especialista' id='especialista' onclick='redirecionarEspecialista()'>Consultar especialista</button>\
                        </section>\
                    </div>\
                    </div>\
                    <script>\
                        let estrelas = document.querySelectorAll('.estrela');\
                        estrelas.forEach((estrela, i) => {\
                            estrela.onclick = function () {\
                                let estrelaAtual = i + 1;\
                                $('#avaliacao').val(estrelaAtual);\
                                estrelas.forEach((estrela, j) => {\
                                    if (estrelaAtual >= j + 1) {\
                                        estrela.innerHTML = '&#9733';\
                                    } else {\
                                        estrela.innerHTML = '&#9734';\
                                    }\
                                })\
                            }\
                        });\
                    </script>"
            );
            break;
        //caso o resultado dar falso
        case 'f':
            $(".content").append(
                "<div class='card'>\
                    <div class='card-header'>\
                        <h1>\
                            Essa notícia é <span style='color: #d16666;font-weight: 600;\
                            font-size: 1.3rem'>falsa</span>!\
                            <br><br>\
                        </h1>\
                        <h2>\
                            Nosso algoritmo de avaliação de veracidade identificou o link enviado\
                            como link que direciona o usuário à notícia falsa.\
                            <br><br>\
                        </h2>\
                    </div>\
                    <form action=''>\
                        <input type='hidden' id='link' value=''>\
                        <div class='card-footer'>\
                            <h2>\
                                <span style='font-weight: 600;'>Mas e o que você acha? O quanto você acha que essa notícia é verdadeira?</span>\
                                <br>\
                                <span style='font-size:0.9rem;'>(Indique o que pensa com uma nota de 1 a 5. Com a nota baixa indicando que considera a notícia falsa e uma nota maior\
                                sinaliza que você tende a pensar que a notícia é verdadeira)</span>\
                                <br>\
                            </h2>\
                        </div>\
                        <input type='hidden' id='avaliacao' value=''>\
                    </form>\
                    <div class='avaliacao'>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                    </div>\
                    <div class='wrapper-btns'>\
                        <section class='btn-container'>\
                            <button class='avaliar' id='avaliar' onclick='gravarConsulta()'>Avaliar</button>\
                            <button class='especialista' id='especialista' onclick='redirecionarEspecialista()'>Consultar especialista</button>\
                        </section>\
                    </div>\
                    </div>\
                    <script>\
                        let estrelas = document.querySelectorAll('.estrela');\
                        estrelas.forEach((estrela, i) => {\
                            estrela.onclick = function () {\
                                let estrelaAtual = i + 1;\
                                $('#avaliacao').val(estrelaAtual);\
                                estrelas.forEach((estrela, j) => {\
                                    if (estrelaAtual >= j + 1) {\
                                        estrela.innerHTML = '&#9733';\
                                    } else {\
                                        estrela.innerHTML = '&#9734';\
                                    }\
                                })\
                            }\
                        });\
                    </script>"
            );
            break;
        //caso não tenha resposta
        case 'n':
            $(".content").append(
                "<div class='card'>\
                    <div class='card-header'>\
                        <h1>\
                            Ops... Não encontramos resultados para esse link :(\
                            <br><br>\
                        </h1>\
                        <h2>\
                            Nosso algoritmo de avaliação de veracidade infelizmente não encontrou resposta\
                            para confirmar a veracidade dessa informação. Assim, indicamos à você que envie o link na nossa página de especialista :).\
                            <br><br>\
                        </h2>\
                    </div>\
                    <form action=''>\
                        <input type='hidden' id='link' value=''>\
                        <div class='card-footer'>\
                            <h2>\
                                <span style='font-weight: 600;'>Mas, mesmo sem uma verificação, o que você acha? O quanto você acha que essa notícia é verdadeira?</span>\
                                <br>\
                                <span style='font-size:0.9rem;'>(Indique o que pensa com uma nota de 1 a 5. Com a nota baixa indicando que considera a notícia falsa e uma nota maior\
                                sinaliza que você tende a pensar que a notícia é verdadeira)</span>\
                                <br>\
                            </h2>\
                        </div>\
                        <input type='hidden' id='avaliacao' value=''>\
                    </form>\
                    <div class='avaliacao'>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                        <button class='estrela'>&#9734;</button>\
                    </div>\
                    <div class='wrapper-btns'>\
                        <section class='btn-container'>\
                            <button class='avaliar' id='avaliar' onclick='gravarConsulta()'>Avaliar</button>\
                            <button class='especialista' id='especialista' onclick='redirecionarEspecialista()'>Consultar especialista</button>\
                        </section>\
                    </div>\
                </div>\
                <script>\
                    let estrelas = document.querySelectorAll('.estrela');\
                    estrelas.forEach((estrela, i) => {\
                        estrela.onclick = function () {\
                            let estrelaAtual = i + 1;\
                            $('#avaliacao').val(estrelaAtual);\
                            estrelas.forEach((estrela, j) => {\
                                if (estrelaAtual >= j + 1) {\
                                    estrela.innerHTML = '&#9733';\
                                } else {\
                                    estrela.innerHTML = '&#9734';\
                                }\
                            })\
                        }\
                    });\
                </script>"
            );
            break;
    }
}

//Gravar dados
function gravarConsulta(isEspecialista) {
    let novoId = 1;
    let thereIsLink = false;
    let thereIsLinkId = 0;
    let flagEspecialista = isEspecialista;
    let dataConsulta = new Date().toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let notaConsulta = $("#avaliacao").val();
    for (let i = 0; i < db.data.length; i++) {
        if (db.data[i].link == linkConsulta) {
            thereIsLink = true;
            thereIsLinkId = db.data[i].id;
        }
    }
    if (thereIsLink) {
        if(isEspecialista){
            let update = {
                "nota": 0,
                "data": dataConsulta,
            }
            updateHistorico(thereIsLinkId, update);
        }
        if (isEspecialista == false || flagEspecialista == undefined) {
            let nota = notaConsulta;
            if(notaConsulta == ""){
                nota = 0;
            }
            let update = {
                "nota": nota,
                "data": dataConsulta,
            }
            updateHistorico(thereIsLinkId, update);
            let redirecionamento = "compartilharpesquisa.html?link=" + linkConsulta;
            window.location.href = redirecionamento;
        }
    } else {
        if (db.data.length != 0)
            novoId = db.data[db.data.length - 1].id + 1;
        let novaConsulta = {
            "id": novoId,
            "link": linkConsulta,
            "media": notaConsulta,
            "somanotas": notaConsulta,
            "data": dataConsulta,
            "status": statusConsulta,
            "consultas": 1
        };
        db.data.push(novaConsulta);
        localStorage.setItem('db_consulta', JSON.stringify(db));
        if (isEspecialista == false || flagEspecialista == undefined) {
            let redirecionamento = "compartilharpesquisa.html?link=" + linkConsulta;
            window.location.href = redirecionamento;
        }
    }
}

//Atualiza bd se o link consultado pelo usuário é repetido
function updateHistorico(id, update) {
    let index = db.data.map(objt => objt.id).indexOf(id);
    db.data[index].data = update.data;
    db.data[index].consultas++;
    if(db.data[index].somanotas == ""){
        db.data[index].somanotas = update.nota;
    }else{
        db.data[index].somanotas = parseInt(db.data[index].somanotas) + parseInt(update.nota);
    }
    db.data[index].media = db.data[index].somanotas / db.data[index].consultas;
    localStorage.setItem('db_consulta', JSON.stringify(db));
}

function redirecionarEspecialista() {
    gravarConsulta(true);
    let redirecionamento = "especialista.html?link=" + linkConsulta;
    window.location.href = redirecionamento;
}