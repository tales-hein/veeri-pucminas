$(document).ready(function () {
    let url = window.location.href;
    let params = (new URL(url)).searchParams;
    let linkConsulta = params.get('link');
    $("#link-noticia").val(linkConsulta);
})

let validolink = false;
let validoemail = false;

function validarLink() {
    validolink = false;
    let link = $("#link-noticia").val();
    $("#container-erro-link").empty();
    if (link == "") {
        validolink = false;
        $("#link-noticia").attr('style', 'border: 2px solid #dc3545;"');
        $("#container-erro-link").append("<p style='color:#dc3545;font-size:16px'> <i class='fa fa-circle-exclamation'></i>&nbsp;Certifique-se de que inseriu um link</p>");
        return;
    }
    if (isValidURL(link)) {
        validolink = true;
        $("#container-erro-link").empty();
        $("#link-noticia").attr('style', 'border: 2px solid #198754;"');
    } else {
        validolink = false;
        $("#container-erro-link").empty();
        $("#link-noticia").attr('style', 'border: 2px solid #dc3545;"');
        $("#container-erro-link").append("<p style='color:#dc3545;font-size:16px'> <i class='fa fa-circle-exclamation'></i>&nbsp;O link inserido acima não é válido</p>");
    }
}

function validarEmail() {
    let email = $("#email").val();
    validoemail = false;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    $("#container-erro-email").empty();
    if (email == "") {
        validoemail = false;
        $("#email").attr('style', 'border: 2px solid #dc3545;"');
        $("#container-erro-email").append("<p style='color:#dc3545;font-size:16px'> <i class='fa fa-circle-exclamation'></i>&nbsp;O campo de e-mail está vazio</p>");
        return;
    }
    if (email.match(pattern) && email !== "") {
        validoemail = true;
        $("#container-erro-email").empty();
        $("#email").attr('style', 'border: 2px solid #198754;"');
    }
    if (validoemail == false) {
        $("#email").attr('style', 'border: 2px solid #dc3545;"');
        $("#container-erro-email").append("<p style='color:#dc3545;font-size:16px'> <i class='fa fa-circle-exclamation'></i>&nbsp;Certifique-se de que inseriu um email válido</p>");
    };

    if (validoemail) {
        $("#container-erro-email").empty();
        $("#email").attr('style', 'border: 2px solid #198754;"');
    };
}

function isValidURL(link) {
    let res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

// API E-mail (SmtpJS)

$("#enviar").on('click', function () {
    let link = $("#link-noticia").val();
    let email = $("#email").val();
    let texto = $("#texto").val();
    validarEmail();
    validarLink();
    if (validoemail && validolink) {
        let body = `
        <p>Olá! Obrigado por contribuir com a evolução da nossa plataforma.
        Assim que a sua notícia for avaliada você receberá novo contato
        informando a veracidade do que foi noticiado à você.
        </p>
        <br>
        <p><b>Link da sua notícia: </b>`+ link + `</p>
        <br>
        <p><b>Informações adicionais que você nos forneceu: </b>"`+ texto + `"</p>
        <br>
        <br>
        <p><small>Equipe Veeri 2022</small></p>
        `;

        Email.send({
            SecureToken: "6a65bfef-5355-49d1-8cf4-7b68a996b14f",
            To: email,
            From: "veeri.oficial@gmail.com",
            Subject: "Obrigado pela contribuição! Sua notícia será verificada em breve",
            Body: body
        }).then(
            alert("Pedido de consulta enviada!")
        );
    }
})

