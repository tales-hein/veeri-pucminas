$(document).ready(function () {
  dadosJs.fCarregarHistorico();
});

function loadScript(){
  $("#scriptaccordion").append(
    "<script>\
          document.querySelectorAll('.accordion-item-header').forEach(elm => {\
            elm.addEventListener('click', e => {\
                elm.classList.toggle('active');\
                if (elm.classList.contains('active')) {\
                    elm.nextElementSibling.style.maxHeight = elm.nextElementSibling.scrollHeight + 'px';\
                } else {\
                    elm.nextElementSibling.style.maxHeight = 0;\
                }\
            });\
        });\
    </script>"
  );
}

var dadosJs = ({

  fCarregarHistorico: function () {
    $("#rankUser").attr('class', 'btn-clicado');
    $("#rankGeral").attr('class', 'btn-nao-clicado');
    $("#scriptaccordion").empty();
    $(".ranking-container").empty();
    let arrData = JSON.parse(localStorage.getItem('db_consulta'));
    for (let i = 1; i < arrData.data.length; i++) {
      let statusLinkHistorico = "";
      switch (arrData.data[i].status) {
        case "v":
          statusLinkHistorico = "<span style='font-weight:600;color:#198754;'>verdadeira</span>";
          break;
        case "f":
          statusLinkHistorico = "<span style='font-weight:600;color:#d16666;'>falsa</span>";
          break;
        case "n":
          statusLinkHistorico = "<span style='font-weight:600;'>não avaliado</span>";
          break;
      }
      $(".ranking-container").append(
        "<div class='accordion'>\
                <div class='accordion-item'>\
                  <div class='accordion-item-header'>\
                    <a href=" + "'" + arrData.data[i].link + "'" + " style='font-size: 14px;' target='_blank' rel='noopener noreferrer'><span style='font-weight: bold;'>" + i + "</span>" + "  " + arrData.data[i].link + "</a>\
                  </div>\
                  <div class='accordion-item-body'>\
                    <div class='accordion-item-body-content'>\
                      <p>Status da notícia: " + statusLinkHistorico + "</p>\
                      <br>\
                      <p>Data da última consulta: " + arrData.data[i].data + "</p>\
                      <br>\
                      <p>Número de vezes que o usuário consultou essa notícia: " + arrData.data[i].consultas + "</p>\
                      <br>\
                      <p>Média das avaliações dessa notícia: " + arrData.data[i].media + "</p>\
                    </div>\
                  </div>\
                </div>\
            </div>\
            "
      );
    }
    loadScript();
  },

  fCarregarBancoSist: function () {
    $("#rankGeral").attr('class', 'btn-clicado');
    $("#rankUser").attr('class', 'btn-nao-clicado');
    $(".ranking-container").empty();
    $.getJSON("bd_rep_noticias.json", function (json) {
      for (let i = 1; i < json.data.length; i++) {
        if (json.data[i].status == "f") {
          $(".ranking-container").append(
            "<div class='item'>\
                            <div class='item-link'>\
                              <a href="+ "'" + json.data[i].link + "'" + " style='font-size: 14px;' target='_blank' rel='noopener noreferrer'><span style='font-weight: bold;' >" + i + "</span>" + "  " + json.data[i].link + "</a>\
                            </div>\
                            <div class='item-link'>\
                              <p style='font-size: 14px;'>Status:<span style='font-weight:600;color:#d16666;'>falso</span></p>\
                            </div>\
                        </div>"
          );
        };
        if (json.data[i].status == "v") {
          $(".ranking-container").append(
            "<div class='item'>\
                            <div class='item-link'>\
                              <a href="+ "'" + json.data[i].link + "'" + " style='font-size: 14px;' target='_blank' rel='noopener noreferrer'><span style='font-weight: bold;' >" + i + "</span>" + "  " + json.data[i].link + "</a>\
                            </div>\
                            <div class='item-link'>\
                              <p style='font-size: 14px;'>Status:<span style='font-weight:600;color:#198754;'>verdadeiro</span></p>\
                            </div>\
                        </div>"
          );
        };
      }
    })
  },
})

