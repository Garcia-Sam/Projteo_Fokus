const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBT = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const iniciarOuPausarIcon = document.querySelector(".app__card-primary-butto-icon")
const startPauseBt = document.querySelector("#start-pause")
const musicaFocoInput = document.querySelector("#alternar-musica")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const  musica = new Audio("./sons/luna-rise-part-one.mp3") //readFile()
const play = new Audio ("./sons/play.wav")
const pause = new Audio ("./sons/pause.mp3")
const beep = new Audio ("./sons/beep.mp3")

let tempoDecorridoEmSegundos = 5
let intervaloId = null

musica.loop = true
musicaFocoInput.addEventListener("change", () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener("click", () => {
    alterarContexto('foco')
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add("active")
})

longoBT.addEventListener("click", () => {
    alterarContexto('descanso-longo')
    longoBT.classList.add("active")
})

function alterarContexto(contexto) {
    botoes.forEach(function(contexto){
        contexto.classList.remove("active")
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class = "app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class = "app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}
const contagemRegressiva = () =>{
    if (tempoDecorridoEmSegundos <= 0) {
        //beep.play()
        alert("Tempo Finalizado!")
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador:' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        pause.play()
        zerar()
        return 
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000) //sempre recebe o valor em ms
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarIcon.setAttribute('src', `./imagens/pause.png`)
}

function zerar (){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarIcon.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}