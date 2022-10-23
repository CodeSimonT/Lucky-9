const massage = document.getElementById("info");
const p1Cards = document.getElementById("card1");
const p1CardSum = document.getElementById("sum1");
const p2Cards = document.getElementById("card2");
const p2CardSum = document.getElementById("sum2");
const start = document.getElementById("bton1");
const draw = document.getElementById("bton2");
const fight = document.getElementById("bton3");
const restart = document.getElementById("bton4");
let win = false;
let alive = false;
let cardSet1 = [];
let cardSet2 = [];
let p1Total = 0;
let p2Total = 0;
let cardMassage = ""
// randomcard
const randomCard = () => {
    let randomizer = Math.floor(Math.random() * 10) + 1;
    return randomizer;
}
// start button
start.addEventListener("click", function() {
        if(cardSet1.length === (0)) {
            let card1 = randomCard();
            let card2 = randomCard();
            let card4 = randomCard();
            let card5 = randomCard();
            cardSet1 = [card1,card2];
            cardSet2 = [card4,card5];
            p1Total = card1 + card2;
            p2Total = card4 + card5;
            alive = true
           p1Process();
        }

})
// process for player 1
const p1Process = () => {
        p1Cards.textContent = ""
        for(let i = 0; i < cardSet1.length; i++) {
            p1Cards.textContent += `${cardSet1[i]} `
        }
        if(p1Total == 20) {
            p1Total -= 20;
        }else if(p1Total >= 10) {
            p1Total -= 10
        }
        p1CardSum.textContent = p1Total
        playerMassage()
}
// masssage for the player
const playerMassage = () => {
    const text = {
        massage1: `Draw a card!`,
        massage2: `You got the lucky 9!`,
        massage3: `Want to draw a card?`,
        massage4: `Your card was good but, want to draw a card?`,
        massage5: `Fight your cards`,
        massage6: `The cards is missing`
    };
    switch(true) {
        case cardSet1.length === (3):
            cardMassage = `${text.massage5}`
            break;
        case p1Total == 0:
            cardMassage = `${text.massage1}`;
            break;
        case p1Total == 9:
            cardMassage = `${text.massage2}`;
            break
        case p1Total < 6:
            cardMassage = `${text.massage3}`;
            break;
        case p1Total > 7 || p1Total < 8:
            cardMassage = `${text.massage4}`
            break;
        default:
            cardMassage = `${text.massage6}`
    }
    massage.textContent = cardMassage
}
// draw button
draw.addEventListener("click", function() {
    if(cardSet1.length < (3) && alive === true) {
        let card3 = randomCard()
        cardSet1[2] = card3
        p1Total += card3
        p1Process()
    }
})
// fight button
fight.addEventListener("click", function () {
    if (alive === true) {
        robotFucntion()
        p2CardDraw()
        alive = false
        winner()
    }
})
// player two process
let robotFucntion = () => {
    p2Cards.textContent = ""
    for(i = 0; i < cardSet2.length; i++) {
        p2Cards.textContent += `${cardSet2[i]} `
    }
    if(p2Total == 20) {
        p2Total -= 20
    }else if(p2Total >= 10) {
        p2Total -= 10
    }
    p2CardSum.textContent = p2Total
    p2CardDraw()
}
// robbot cardDraw auto
const p2CardDraw = () => {
    if(p2Total < 8) {
        const card6 = randomCard()
        cardSet2[2] = card6
        p2Total += card6
        robotFucntion()
    }
}
// declearing the winner
const winner = () => {
    switch(true) {
        case p1Total > p2Total:
            cardMassage = `You win`
        case p1Total < p2Total:
            cardMassage = `You lose`
    }
    massage.textContent = cardMassage
    win = true
}
// restart button
restart.addEventListener("click", function() {
   if(win === true) {
    p1Cards.textContent = ""
    p1CardSum.textContent = ""
    p2Cards.textContent = ""
    p2CardSum.textContent = ""
    massage.textContent = "click start"
    cardSet1 = [];
    cardSet2 = [];
    p1Total = 0;
    p2Total = 0;
    win = false;
    alive = false;
   }
    
})