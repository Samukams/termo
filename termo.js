let palavras = [
    "praia",
    "verde",
    "livro",
    "pedra",
    "nuvem",
    "festa",
    "casas",
    "amigo",
    "piano",
    "sonho"
];

let secreta =
    palavras[Math.floor(Math.random() * palavras.length)];

let linha = 0;

let coluna = 0;

let jogoFinalizado = false;

const tabuleiro =
    document.getElementById("tabuleiro");

for(let i = 0; i < 30; i++){

    let div = document.createElement("div");

    div.classList.add("casa");

    div.id = "casa-" + i;

    tabuleiro.appendChild(div);
}

atualizarSelecao();

let teclas =
    document.querySelectorAll(".tecla");

teclas.forEach(botao => {

    botao.addEventListener("click", () => {

        if(jogoFinalizado) return;

        adicionarLetra(
            botao.innerHTML.toLowerCase()
        );
    });
});

document
.getElementById("apagar")
.addEventListener("click", apagarLetra);

document
.getElementById("enter")
.addEventListener("click", verificar);

document.addEventListener("keydown", (event) => {

    if(jogoFinalizado) return;

    let tecla = event.key.toLowerCase();

    if(tecla >= "a" && tecla <= "z"){

        adicionarLetra(tecla);
    }

    if(event.key == "Backspace"){

        apagarLetra();
    }

    if(event.key == "Enter"){

        verificar();
    }
});

function atualizarSelecao(){

    document
    .querySelectorAll(".casa")
    .forEach(casa => {

        casa.classList.remove("ativa");
    });

    if(coluna < 5 && linha < 6){

        let casaAtual =
            document.getElementById(
                "casa-" + (linha * 5 + coluna)
            );

        casaAtual.classList.add("ativa");
    }
}

function adicionarLetra(letra){

    if(coluna < 5){

        let casa =
            document.getElementById(
                "casa-" + (linha * 5 + coluna)
            );

        casa.innerHTML = letra;

        coluna++;

        atualizarSelecao();
    }
}

function apagarLetra(){

    if(coluna > 0){

        coluna--;

        let casa =
            document.getElementById(
                "casa-" + (linha * 5 + coluna)
            );

        casa.innerHTML = "";

        atualizarSelecao();
    }
}

function verificar(){

    if(coluna != 5){

        alert("Digite 5 letras!");

        return;
    }

    let palavra = "";

    for(let i = 0; i < 5; i++){

        let casa =
            document.getElementById(
                "casa-" + (linha * 5 + i)
            );

        palavra += casa.innerHTML;
    }

    for(let i = 0; i < 5; i++){

        let casa =
            document.getElementById(
                "casa-" + (linha * 5 + i)
            );

        let letra = palavra[i];

        setTimeout(() => {

            casa.classList.remove("ativa");

            casa.classList.add("animar");

            casa.classList.remove(
                "verde",
                "amarelo",
                "cinza"
            );

            if(letra == secreta[i]){

                casa.classList.add("verde");

            }else if(secreta.includes(letra)){

                casa.classList.add("amarelo");

            }else{

                casa.classList.add("cinza");
            }

        }, i * 300);
    }

    if(palavra == secreta){

        jogoFinalizado = true;

        setTimeout(() => {

            alert("🎉 VOCÊ ACERTOU!");

        }, 1800);

        return;
    }

    linha++;

    coluna = 0;

    atualizarSelecao();

    if(linha == 6){

        jogoFinalizado = true;

        setTimeout(() => {

            alert(
                "😢 GAME OVER!\n\nPalavra: "
                + secreta
            );

        }, 1800);
    }
}