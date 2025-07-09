const canvas= document.getElementById('meuCanvas')
const ctx = canvas.getContext("2d")


const firebaseConfig = {
  apiKey: "AIzaSyCaOexrnk6dkiLmf-xrGLckKB59797v4uY",
  authDomain: "canvasanimation-c5cc3.firebaseapp.com",
  databaseURL: "https://canvasanimation-c5cc3-default-rtdb.firebaseio.com",
  projectId: "canvasanimation-c5cc3",
  storageBucket: "canvasanimation-c5cc3.firebasestorage.app",
  messagingSenderId: "814093590942",
  appId: "1:814093590942:web:b095a8f1d4832c5019b68f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database()
let nomeJogador = ""
let jogadorId = null
let rankingRef = database.ref('ranking')

const menu =document.getElementById('menu')
const btnJogar = document.getElementById('btnJogar')
const nomeInput = document.getElementById( 'nomeJogador')

const rankingDiv = document.getElementById( 'ranking')
const rankingLista = document.getElementById( 'rankingLista')
const rankingMenu = document.getElementById( 'rankingMenu')


function SalvarPontuacaoNoFireBase () {
    if (!nomeJogador || pontuacao<0) {
        console.log ("Não salva: nomeJogador ou pontuação inválida");
        return
    }
    console.log (`Salvando pontuação: ${pontuacao} para ${nomeJogador}`)

    rankingRef.child(jogadorId).set({
        nome: nomeJogador,
        pontos: pontuacao,
        data: firebase.database.ServerValue.TIMESTAMP
    }).then (() => {
        console.log("A pontuação foi salva com sucesso")
    }).catch((error) => {
        console.log("Erro ao salvar a pontuacao no FireBase"+error)
    })
   
}
function resizeCanvas () {
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight

    x=Math.min(Math.max(x,raio), canvas.width-raio)
    x=Math.min(Math.max(y,raio), canvas.height-raio)
   

}


window.addEventListener('resize',resizeCanvas)

let x = 100
let y = 100
let quadradox = 2
let quadradoy = 2
let perdery = 500
let perderx = 500
let pontuacao = 0
const rect = 30
const lado = 30
const lado2 = 30
const raio = 30

let velocidadeY = 3
let velocidadeX = 3
let speedy = 8
let speedx = 8
let veloy= 10
let velox= 10
let velX,velY 

let jogoIniciado = false
let jogoTerminado = false

const perigosos = []

const somPonto = document.getElementById('Win')
const somPerder = document.getElementById('End')
const somInimigo = document.getElementById('Lose')
const particulas = []


for (let i = 0 ; i<5; i++) {
    perigosos.push({
        x: Math.random()*(canvas.width-50),
        y: Math.random()*(canvas.height-50),
        lado: 40,
        velX: (Math.random()*4)+1,
        velY: (Math.random()*4)+1

    })
}

resizeCanvas()
desenharTelaInicial()

btnJogar.addEventListener ("click",()=>{ 

    if (nomeInput.value.trim() !== "") {
        nomeJogador = nomeInput.value.trim()
        jogadorId = nomeJogador+"_"+Date.now  ()
        menu.classList.add('hidden')
        rankingDiv.style.display ="block"
        jogoIniciado=true
        jogoTerminado=false
        pontuacao=1
        resizeCanvas()
        animar()
        SalvarPontuacaoNoFireBase()
    } else {
        alert("Por favor insira um nome")
    }
        
}
)

rankingRef.orderByChild ('pontos').limitToLast(10).on('value',
   (snapshot) => {
    const dados = snapshot.val () || {};
    const ranking = Object.values(dados).sort((a,b) => b.pontos-a.pontos)
    let htmlMenu = '<h3> Melhores Pontuações </h3><ol>'
    ranking.slice (0,5).forEach(jogador=> {
        htmlMenu += `<li>${jogador.nome}: ${jogador.pontos} </li>`
    })
        htmlMenu += `</ol>`

        rankingMenu.innerHTML = htmlMenu

        let html = ""
        ranking.slice(0,5).forEach(jogador=> {
            html += `<div>${jogador.nome}: ${jogador.pontos}</div>`
        })

        rankingLista.innerHTML = html
   })

function desenhandoCirculo() {
    ctx.beginPath()
    ctx.arc(x,y,raio,0,Math.PI*2)
    ctx.fillStyle="white";
    ctx.fill()
    ctx.closePath()
}

function desenhandoQuadrado() {
    ctx.beginPath()
    ctx.rect(quadradox,quadradoy,lado,lado)
    ctx.fillStyle ="Green"
    ctx.fill()
    ctx.closePath()
}

function desenhandoPerder() {
    ctx.beginPath()
    ctx.rect(perderx,perdery,lado2,lado2)
    ctx.fillStyle ="Red"
    ctx.fill()
    ctx.closePath()
}

function atualizarPosicao() {
    //x += velocidadeX
    //y += velocidadeY

    quadradox +=speedx
    quadradoy +=speedy
    
    perderx +=velox
    perdery +=veloy

    if (quadradox+lado>canvas.width || quadradox-lado<0){
        speedx= -speedx
    }
    
    if (quadradoy+lado>canvas.height || quadradoy-lado<0){
        speedy= -speedy
    }

    if (perderx+lado2>canvas.width || perderx-lado2<0){
        velox= -velox
    }

    if (perdery+lado2>canvas.height || perdery-lado2<0){
        veloy= -veloy
    }

    if(x+raio>canvas.width||x-raio<0){
        velocidadeX= -velocidadeX;
    }

    if(y+raio>canvas.height ||y-raio<0){
        velocidadeY= -velocidadeY;
    }

    for (let inimigo of perigosos){
        inimigo.x+= inimigo.velX
        inimigo.y+= inimigo.velY

        if (inimigo.x +inimigo.lado>canvas.width||inimigo.x<0){
            inimigo.velX *= -1
        }
        if (inimigo.y +inimigo.lado>canvas.height||inimigo.y<0){
            inimigo.velY *= -1
        }
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhandoCirculo();
    atualizarPosicao();
    desenhandoQuadrado();
    desenhandoPerder();
    desenharPontuacao();
    desenharPerigosos();
    desenharParticulas()
    
    const disX = Math.abs(x - (quadradox + lado / 2));
    const disY = Math.abs(y - (quadradoy + lado / 2));
    const disX2 = Math.abs(x - (perderx + lado2 / 2));
    const disY2 = Math.abs(y - (perdery + lado2 / 2));

    const colidiuVerde = disX < raio + lado / 2 && disY < raio + lado / 2;
    const colidiuVermelho = disX2 < raio + lado2 / 2 && disY2 < raio + lado2 / 2;

    if (colidiuVermelho) {
        pontuacao=-4
        somPerder.currentTime=0
        somPerder.play()
        criarExplosao(x,y,'255,0,0')
        desenharGameOver()
        SalvarPontuacaoNoFireBase()
    }

    if (colidiuVerde) {
        somPonto.currentTime=0
        somPonto.play()
        criarExplosao(x,y,'0,255,0')
        pontuacao++;
        quadradox = Math.random() * (canvas.width - lado);
        quadradoy = Math.random() * (canvas.height - lado);
        SalvarPontuacaoNoFireBase()
    }

    for (let inimigo of perigosos) {
        if (verificarColisaoComPerigoso(inimigo)){  
        pontuacao--;
        somInimigo.currentTime=0
        somInimigo.play()
        criarExplosao(x,y,'255,255,0')
        inimigo.x = Math.random() * (canvas.width -inimigo.lado)
        inimigo.y = Math.random() * (canvas.height -inimigo.lado)
        SalvarPontuacaoNoFireBase()
        }
    }
    if (pontuacao < -3){
        jogoTerminado = true
        desenharGameOver()
        return
    }

    requestAnimationFrame(animar);
}





canvas.addEventListener("mousemove",function(event){
    const rect = canvas.getBoundingClientRect()
    x = event.clientX-rect.left
    y = event.clientY-rect.top


})


  function verificarColisao() {
    const disX = Math.abs(x - (quadradox + lado / 2));
    const disY = Math.abs(y - (quadradoy + lado / 2));
    const disX2 = Math.abs(x - (perderx + lado2 / 2));
    const disY2 = Math.abs(y - (perdery + lado2 / 2));

    if (disX < raio + lado / 2 && disY < raio + lado / 2) {
        
        return true;
        
    }

    if (disX2 < raio + lado2 / 2 && disY2 < raio + lado2 / 2) {
        return true;
    }
    
    return false;

}


function desenharPontuacao () {
    ctx.fillStyle ="Grey"
    ctx.font="35px Arial"
    ctx.fillText("Pontuação: "+pontuacao, 100,40)
    
}


function desenharPerigosos () {
    ctx.fillStyle="yellow";
    for (let inimigo of perigosos){
        ctx.fillRect(inimigo.x,inimigo.y, inimigo.lado, inimigo.lado)
    }
}


function verificarColisaoComPerigoso (obj) {
    const distX = Math.abs (x-(obj.x+lado/2))
    const distY = Math.abs (y-(obj.y+lado/2))

    return distX <raio +obj.lado/2 && distY <raio +obj.lado/2
}

function desenharTelaInicial () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.font = "30px Arial"
    ctx.fillStyle = "White"
    ctx.textAlign = "center"
    ctx.fillText ("Confirme seu nome para iniciar", canvas.width/2, canvas.height/2 + 70)
}

function criarExplosao (x,y,cor) {
    for (let i = 0; i<20; i++) {
        particulas.push ({
            x:x,
            y:y,
            raio: Math.random()*4+2,
            velX:(Math.random()-0.5)*5,
            velY:(Math.random()-0.5)*5,
            alpha: 1,
            cor: cor
        })
         
    }
}

function desenharParticulas () {
    for (let i=particulas.length-1; i>=0; i--) {
        let p = particulas[i];

        ctx.beginPath()
        ctx.arc(p.x,p.y,p.raio,0,Math.PI*2)
        ctx.fillStyle=`rgba(${p.cor},${p.alpha})`
        ctx.fill()
        ctx.closePath()

        p.x +=p.velX
        p.y +=p.velY
        p.alpha -=0.03
        p.raio *=0.96

        if (p.alpha<=0 || p.raio<=0.5) {
            particulas.splice(i,1);
        }
    }
}

function desenharGameOver() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.font="40px Arial";
    ctx.fillStyle="Red"
    ctx.textAlign="center"
    ctx.fillText("Game Over",canvas.width/2,canvas.height/2)
    ctx.fillStyle="White"
    ctx.font="20px Arial"
    ctx.fillText("Aguarde novamente, o jogo irá reiniciar", canvas.width/2,canvas.height/2+40)
    

    setTimeout(() =>{
        menu.classList.remove('hidden');
        rankingDiv.style.display='none'
        pontuacao=0
        jogoTerminado=false
        jogoIniciado=false
        desenharTelaInicial()
    },3000);
}

function reiniciarJogo (){
    jogoTerminado=false
    pontuacao=0
    jogoIniciado=false
    particulas.length=0
    for (let inimigos of perigosos) {
        inimigos.x=Math.random()*(canvas.width-inimigos.lado)
        inimigos.y=Math.random()*(canvas.height-inimigos.lado)
    }
    desenharTelaInicial()
}