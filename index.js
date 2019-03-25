var cardsCollection = ["🐰", "🐰", " 🐹", " 🐹", " 🐨", " 🐨", " 🐷", " 🐷", " 🐸", " 🐸", " 🐿", " 🐿"];
cardsCollection = shuffle(cardsCollection);
var game = new Game();

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('card-back')) {
        if (!game.opened_cards[0].matched === true) {
            event.target.parentNode.children[0].checked = false; 
        }
    }
});

document.addEventListener('click', function(event) {

    // clicking on the empty card will put random emoji from a collection
    if (event.target.classList.contains('card-front')) {
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
    this.decide = ()=>this.opened_cards[this.opened_cards.length - 1].value === this.opened_cards[this.opened_cards.length - 2].value ? true : false;

}
