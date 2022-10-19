const Game_State = {
  FistCardAwaite: "FistCardAwaite",
  SecondCardAwaite: "SecondCardAwaite",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatch: "CardsMatch",
  GameFinished: "GameFinished",
};
const view = {
  getCardcontent(index) {
    const Symbols = [
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png", // 黑桃
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png", // 愛心
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png", // 方塊
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png", // 梅花
    ];
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];
    return `
            <p>${number}</p>
            <img src="${symbol}" alt="symbol">
            <p>${number}</p>
        `;
  },

  getCardElement(index) {
    return `<div class="card back" data-index= ${index}></div>`;
  },

  transformNumber(number) {
    switch (number) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return number;
    }
  },

  filpCards(...cards) {
    cards.map((card) => {
      if (card.classList.contains("back")) {
        card.classList.remove("back");
        card.innerHTML = this.getCardcontent(Number(card.dataset.index));
        return;
      }

      card.classList.add("back");
      card.innerHTML = null;
    });
  },

  pairedCards(...cards) {
    cards.map((card) => {
      card.classList.add("paired");
    });
  },

  renderScore(score) {
    document.querySelector(".score").textContent = `Score: ${score}`;
  },

  renderTimes(times) {
    document.querySelector(
      ".times"
    ).textContent = `You've tried ${times} times`;
  },

  wrongAnimation(...cards) {
    cards.map((card) => {
      card.classList.add("wrong");

      // When animation end, it will remove wrong class
      card.addEventListener(
        "animationend",
        (event) => {
          event.target.classList.remove("wrong");
        },
        { once: true }
      ); //once: If true, the listener will be remove after invoked
    });
  },

  gameFinished() {
    const div = document.createElement("div");
    div.classList.add("finished");
    div.innerHTML = `
    <h1>Completed!</h1>
    <p>Score is ${modal.score}</p>
    <p>Yoy've tried ${modal.times} times</p>`;
    document.body.appendChild(div);
  },

  displayCards(indexes) {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = indexes
      .map((index) => this.getCardElement(index))
      .join(" ");

    // in forEach way
    // indexes.forEach(
    //   (index) => (rootElement.innerHTML += this.getCardElement(index))
    // );
  },
};

const uility = {
  getRandomCard(count) {
    const number = Array.from(Array(count).keys());
    // Fisher-Yates Shuffle
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      [number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index],
      ];
    }
    return number;
  },
};

const modal = {
  revealedCards: [],

  isrevealedCardsMatched() {
    return (
      Number(this.revealedCards[0].dataset.index) % 13 ===
      Number(this.revealedCards[1].dataset.index) % 13
    );
  },

  score: 0,
  times: 0,
};

const controller = {
  currentState: Game_State.FistCardAwaite, // Game initialize

  generateCard() {
    view.displayCards(uility.getRandomCard(52));
  },

  dispatchCardAction(card) {
    if (!card.classList.contains("back")) {
      return;
    }

    switch (this.currentState) {
      case Game_State.FistCardAwaite:
        view.filpCards(card);
        modal.revealedCards.push(card);
        this.currentState = Game_State.SecondCardAwaite;
        break;
      case Game_State.SecondCardAwaite:
        view.renderTimes(++modal.times);
        view.filpCards(card);
        modal.revealedCards.push(card);
        if (modal.isrevealedCardsMatched()) {
          //pair successfully
          this.currentState = Game_State.CardsMatch;
          view.renderScore((modal.score += 10));
          view.pairedCards(...modal.revealedCards);
          modal.revealedCards = [];
          if (modal.score === 260) {
            this.currentState = Game_State.GameFinished;
            view.gameFinished();
            return;
          }
          this.currentState = Game_State.FistCardAwaite;
        } else {
          //pair failed
          this.currentState = Game_State.CardsMatchFailed;
          view.wrongAnimation(...modal.revealedCards);
          setTimeout(controller.resetCard, 1000);
        }
        break;
    }
  },

  resetCard() {
    view.filpCards(...modal.revealedCards);
    modal.revealedCards = [];
    controller.currentState = Game_State.FistCardAwaite;
  },
};

controller.generateCard();

document
  .querySelector("#cards")
  .addEventListener("click", function onCardClik(event) {
    const card = event.target;
    if (card.classList.contains("card")) {
      controller.dispatchCardAction(card);
    }
  });
