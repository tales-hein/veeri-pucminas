let linkConsulta = "";

$(document).ready(function () {
    let url = window.location.href;
    let params = (new URL(url)).searchParams;
    linkConsulta = params.get('link');
    $("#link-noticia").val(linkConsulta);
    $("#linktwitter").attr("href", linkConsulta);
})

function copyToClipboard(textToCopy) {
    // solução retirada de: https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
    // O problema é que a API que faz cópias no clipboard requer uma origem segura para usar a função 'writeText', logo
    // foi preciso usar uma espécie de gambiarra (inserida no bloco 'else' abaixo) pois a hospedagem do github pelo jeito não é segura. 
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

function copiar() {
    copyToClipboard(linkConsulta)
        .then(() => {
            let tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Link copiado!";
        })
        .catch(() => {
            let tooltip = document.getElementById("myTooltip");
            tooltip.innerHTML = "Erro ao copiar link";
        })
}

function msgCopiar() {
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Clique para copiar";
}