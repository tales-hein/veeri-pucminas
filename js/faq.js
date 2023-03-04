document.querySelectorAll(".accordion-item-header").forEach(elm => {
    elm.addEventListener("click", e => {
        elm.classList.toggle("active");
        if (elm.classList.contains("active")) {
            elm.nextElementSibling.style.maxHeight = elm.nextElementSibling.scrollHeight + "px";
        } else {
            elm.nextElementSibling.style.maxHeight = 0;
        }
    });
});