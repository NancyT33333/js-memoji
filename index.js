var cardsCollection = ["🐰", "🐰", " 🐹", " 🐹", " 🐨", " 🐨", " 🐷", " 🐷", " 🐸", " 🐸", " 🐿", " 🐿"];
cardsCollection = shuffle(cardsCollection);
var game = new Game();




document.addEventListener('click', function(event) {

    if (event.target.classList.contains('card-back')) {

        let id = event.target.parentNode.id;
        let card = getCardById(id);
        if (!card.matched ===true && game.opened_cards.length < 2) {
            event.target.parentNode.children[0].checked = false;  // remove from cards_opened
            let id = event.target.parentNode.id;
            closeOpened(id, game);

        }
    }
});

function tick() {

    const timeDisplayed = document.querySelector('.timer');
    if (parseInt(timeDisplayed.textContent.split(':')[1]) > 0) {
        timeDisplayed.textContent = (timeDisplayed.textContent.split(':')[1] > 10 ?
             '00:' + (timeDisplayed.textContent.split(':')[1] - 1) :  '00:0' + (timeDisplayed.textContent.split(':')[1] - 1));
        game.timerId = setTimeout(tick, 1000);

    } else {
        document.querySelector('.loose').parentNode.classList.remove('hidden');
        clearInterval(game.timerId);



}
}

function getCardById(id) {

    for (card in game.matched_cards ) {
        if (game.matched_cards[card].id === id) {
            return game.matched_cards[card];
        }
    }
    for (card in game.opened_cards ) {
        if (game.opened_cards[card].id === id) {
            return game.opened_cards[card];
        }
    }

}

function closeOpened(id, game) {
    for (card in game.opened_cards) {
        if (game.opened_cards[card].id === id) {

            var elemToChangeBackground = document.querySelector('#' + id);
            elemToChangeBackground.children[2].style.background = "white";
            elemToChangeBackground.children[2].style.borderColor = "white";
            game.opened_cards.splice(card, 1);


        }
    }
}



document.addEventListener('click', function(event) {

    // clicking on the empty card will put random emoji from a collection
    if (event.target.classList.contains('card-front')) {

        document.querySelector('.timer').textContent==='01:00' ? game.timer() : 0;

        var emoji = event.target.parentNode.children[2].textContent;

        if (emoji === '') {
            event.target.parentNode.children[2].textContent = cardsCollection.shift();

        }
        var card = new Card(event.target.parentNode.id,event.target.parentNode.children[2].textContent);

        game.opened_cards.push(card);

        if (game.opened_cards.length === 2) {

            if (game.decide() === true) {
                for (let card = game.opened_cards.length - 1; game.opened_cards.length > 0; card--) {
                    var id = game.opened_cards[card].id;
                    var elemToChangeBackground = document.querySelector('#' + id);
                    elemToChangeBackground.children[2].style.background = "#5AD66F";
                    elemToChangeBackground.children[2].style.borderColor = "#5AD66F";
                    game.opened_cards[card].matched = true;
                    game.matched_cards.push(game.opened_cards[card]);
                    game.opened_cards.splice(card, 1);
                    if (game.matched_cards.length === 12) {
                        clearInterval(game.timerId);

                        document.querySelector('.win').parentNode.classList.remove('hidden');

                    }

                }

            } else if (game.decide() === false) {
                for (card in game.opened_cards) {
                    var id = game.opened_cards[card].id;
                    var elemToChangeBackground = document.querySelector('#' + id);
                    elemToChangeBackground.children[2].style.background = "#F44336";
                    elemToChangeBackground.children[2].style.borderColor = "#F44336";
                }

            }
        }

        if (game.opened_cards.length > 2) {

            for (var card = game.opened_cards.length - 2; card >= 0; card--) {

                let id = game.opened_cards[card].id;
                let elemToUncheck = document.querySelector('#' + id);
                elemToUncheck.children[0].checked = false;
                var elemToChangeBackground = document.querySelector('#' + id);
                elemToChangeBackground.children[2].style.background = "white";
                elemToChangeBackground.children[2].style.borderColor = "white";
                game.opened_cards.splice(card, 1);
            }
        }

    }

});

const buttonWin = document.querySelector('.button_win');

buttonWin.addEventListener('click', function() {
    game.start_new();
    event.stopPropagation();
})

const buttonLoose = document.querySelector('.button_loose');
buttonLoose.addEventListener('click', function() {
    game.start_new();
    event.stopPropagation();
})


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function Card(id, value) {
    this.id = id;
    this.value = value;
    this.matched = false;

}
function Game() {
    //game = {opened_cards: [card1, card2]; decide: function(); pairs_found: 2}
    // stores the info about cards order
    // knows, how many cards are opened
    //knows, how many pairs found
    // sends emojis to cards on page reload

    //function decide(card1,card2) {}

    this.opened_cards = [];
    // opened_cards=[{'list_elem4', "🐰"}, {'list_elem5', "🐰"}
    this.matched_cards = [];
    this.pairs_found = 0;
    this.decide = ()=>this.opened_cards[this.opened_cards.length - 1].value === this.opened_cards[this.opened_cards.length - 2].value;
    this.timer = function () {

        game.timerId = setTimeout(function() {
        var time = document.querySelector('.timer');
        time.textContent = '00:59';

        tick();

    }, 1000);


    }
    this.timerId = undefined;
    this.start_new = function () {

        //перевернуть,  убрать окно, опустошить массивы открытых карточек и мэтчед
        cardsCollection = shuffle(["🐰", "🐰", " 🐹", " 🐹", " 🐨", " 🐨", " 🐷", " 🐷", " 🐸", " 🐸", " 🐿", " 🐿"]);


        document.querySelector('.timer').textContent='01:00';

        var collection = document.querySelectorAll('div.card-back');

        for (var i = 0, len = collection.length; i < len; i++) {
            var elem = collection[i];
            elem.textContent='';

            elem.parentNode.children[0].checked=false;
            var elemToChangeBackground = elem.parentNode;
            elemToChangeBackground.children[2].style.background = "white";
            elemToChangeBackground.children[2].style.borderColor = "white";
        };

        this.opened_cards = [];
        this.matched_cards = [];
        this.timerId=undefined;
        document.querySelector('.button_win').parentNode.parentNode.classList.add('hidden');
        document.querySelector('.button_loose').parentNode.parentNode.classList.add('hidden');
        clearAllIntervals();
    }

}


function clearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}