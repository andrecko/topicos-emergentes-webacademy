function mudaTema(temaSelecionado) {
    let url = "assets/css/estilo-tema-" + temaSelecionado + ".css";
    let linkTema = document.querySelector("#link-tema");
    linkTema.href = url;
}

window.onload = () => {

    let tema = localStorage.getItem("tema");
    if (tema) {
        mudaTema(tema);
    }

    let selectTema = document.querySelector("select#tema");
    selectTema.addEventListener("change", evento => {
        let temaSelecionado = evento.target.value;
        if (temaSelecionado) {
            mudaTema(temaSelecionado);
            localStorage.setItem("tema", temaSelecionado);
        }
    });

}
