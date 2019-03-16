var cardsCollection = ["🐰", "🐰", " 🐹", " 🐹", " 🐨", " 🐨", " 🐷", " 🐷", " 🐸", " 🐸", " 🐿", " 🐿"];
cardsCollection = shuffle(cardsCollection);
var game = new Game();

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('card-back')) {
        event.target.parentNode.children[0].checked = false;
    }
});

document.addEventListener('click', function (event) {
    
    // clicking on the empty card will put random emoji from a collection
    if (event.target.classList.contains('card-front')) {
        var emoji = event.target.parentNode.children[2].textContent;
        // if game.opened_cards =2 ==> game.decide
       if (emoji=='') {

           event.target.parentNode.children[2].textContent = cardsCollection.shift();
           emoji= event.target.parentNode.children[2].textContent;
           var card = new Card(event.target.parentNode.id, emoji);

           game.opened_cards.push(card);
    
    }

    if (game.opened_cards.length ===2) {

       game.decide();
    }
        if (game.opened_cards.length > 2) {
            for (card in game.opened_cards) {
            var id= game.opened_cards[card].id;
            var elemToUncheck = document.querySelector('#'+id);
            elemToUncheck.children[0].checked = false;
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




function Card (id, value ) {
    this.id = id;
    this.value = value;
    this.matched = false;

}
function Game() {     //game = {opened_cards: [card1, card2]; decide: function(); pairs_found: 2}
    // stores the info about cards order
    // knows, how many cards are opened
    //knows, how many pairs found
    // sends emojis to cards on page reload
    
    //function decide(card1,card2) {}

    this.opened_cards = [];   // opened_cards=[{'list_elem4', "🐰"}, {'list_elem5', "🐰"}
    this.pairs_found = 0;
    this.decide = function () {
        if (this.opened_cards[0].value === this.opened_cards[1].value) {

        return true}
        return false;

    };


}


