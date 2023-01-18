const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON =  "icon"


var techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

var cards = null
startgame()

function startgame() {
    print_cards(game.create_card(techs))
}



function print_cards(cards) {
    let gameboard = document.getElementById("gameboard")
    gameboard.innerHTML = ''
    game.cards.forEach(card=>{
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        create_content(card, cardElement)

        cardElement.addEventListener('click', flip_card)
        gameboard.appendChild(cardElement)  
    })
}

function create_content(card, cardElement) {
    create_face(FRONT, card, cardElement)
    create_face(BACK, card, cardElement)
}

function create_face(face, card, element) {
    let card_face = document.createElement('div')
    card_face.classList.add(face)
    if(face === FRONT) {
        let icon_element = document.createElement('img')
        icon_element.classList.add(ICON)
        icon_element.src = "./Assets/images/" + card.icon + ".png"
        card_face.appendChild(icon_element)
    }else{
         card_face.innerHTML = '&lt; / &gt;'
    }
    element.appendChild(card_face)
}



function flip_card() {

    if (game.check(this.id)) {

        this.classList.add("flip")
        if (game.card_select2) {
            if (game.match()) {
                game.clear_cards()
                if (game.check_gameOver()) {
                    let gameOver_display = document.getElementById('gameover')
                    gameOver_display.style.display = 'flex'
                }
            } else {
                setTimeout(()=>{
                    let card1_flip = document.getElementById(game.card_select1.id)
                    let card2_flip = document.getElementById(game.card_select2.id)
                    card1_flip.classList.remove('flip')
                    card2_flip.classList.remove('flip')
                    game.unflip_cards()
                }, 1000)
            }
        }
    }
}

function restart() {
    startgame()
    let gameOver_display = document.getElementById('gameover')
    gameOver_display.style.display = 'none'
}