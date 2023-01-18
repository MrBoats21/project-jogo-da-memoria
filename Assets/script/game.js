let game = {

    hold_mode: false,
    card_select1: null,
    card_select2: null,

    techs: ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'],

    cards : null,

    check: function(id) {
        let card = this.cards.filter(card=>card.id===id) [0]
        if (card.flipped || this.hold_mode) {
            return false
            fli
        }

        if (!this.card_select1) {
            this.card_select1 = card
            this.card_select1.flipped = true
            return true
        } else {
            this.card_select2 = card
            this.card_select2.flipped = true
            this.hold_mode = true
            return true
        }
    },

    match: function() {
        if (!this.card_select1 || !this.card_select2) {
            return false
        } else {
            return this.card_select1.icon === this.card_select2.icon
        }
        
    },

    clear_cards: function() {
        this.card_select1 = null
        this.card_select2 = null
        this.hold_mode = false
    },

    unflip_cards: function() {
        this.card_select1.flipped = false
        this.card_select2.flipped = false
        this.clear_cards()

    },



    create_card: function() {
        this.cards = []
        this.techs.forEach((techs) => {
            this.cards.push(this.create_pair(techs))
        })
        this.cards = this.cards.flatMap(pair => pair)
        this.shufflerCards()
        return this.cards
    },
    
    create_pair: function(tech) {
        return [{
            id: this.createID(tech),
            icon: tech,
            flipped: false
        },{
            id: this.createID(tech),
            icon: tech,
            flipped: false
        }]
    },
    
    createID: function(tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    shufflerCards: function(cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
      
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [this.cards[currentIndex], this.cards[randomIndex]] = [
            this.cards[randomIndex],
            this.cards[currentIndex],
          ];
        }
      },

      check_gameOver: function() {
          return this.cards.filter(card => !card.flipped).length == 0
      }
    
}