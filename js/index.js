let linkFormulario = "";
function validarLink() {
    let valido = false;
    let link = $("#link-noticia").val();
    $("#container-erro").empty();
    if (link == "") {
        valido = false;
        $("#link-noticia").attr('style', 'border: 2px solid #dc3545;"');
        $("#container-erro").append("<p style='color:#dc3545;font-size:16px'> <i class='fa fa-circle-exclamation'></i>&nbsp;Certifique-se de que inseriu um link</p>");
        return;
    }
    if (isValidURL(link)) {
        valido = true;
        $("#container-erro").empty();
        $("#link-noticia").attr('style', 'border: 2px solid #198754;"');
    } else {
        valido = false;
        $("#container-erro").empty();
        $("#link-noticia").attr('style', 'border: 2px solid #dc3545;"');
        $("#container-erro").append("<p style='color:#dc3545;font-size:16px'> <i class='fa fa-circle-exclamation'></i>&nbsp;O link inserido acima não é válido</p>");
    }
    return valido;
}

function isValidURL(link) {
    let res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function enviarLink() {
    if (validarLink()) {
        let redirecionamento = "";
        linkFormulario = $("#link-noticia").val();
        $.getJSON("bd_rep_noticias.json", function (json) {
            let flag = 1;
            for (let i = 0; i < json.data.length; i++) {
                if (json.data[i].link == linkFormulario) {
                    if (json.data[i].status == "v") {
                        flag = 0;
                        redirecionamento = "resultadopesquisa.html?result=v&link=" + linkFormulario;
                        window.location.href = redirecionamento;
                    }
                    if (json.data[i].status == "f") {
                        flag = 0;
                        redirecionamento = "resultadopesquisa.html?result=f&link=" + linkFormulario;
                        window.location.href = redirecionamento;
                    }
                }
            }
            if(flag>0){
                redirecionamento = "resultadopesquisa.html?result=n&link=" + linkFormulario;
                window.location.href = redirecionamento;
            }
        })
        
    };
}


// Avalia se o link já foi pesquisado 



