const board = document.getElementById("board");
const form = document.getElementById('form');

const p1Symbol = document.getElementById('p1Symbol');
const p2Symbol = document.getElementById('p2Symbol');

const p1Score = document.getElementById('p1Score');
const p2Score = document.getElementById('p2Score');

let players = [];

class Player {
  name;
  symbol;
  turn;
  streak;
  AI;
  constructor(name, symbol, turn, AI = false) {
    this.name = name;
    this.symbol = symbol ? "O" : "X";
    this.turn = turn;
    this.streak = 0;
    this.AI = AI;
  }
  get name() { return this.name };
  get symbol() { return this.symbol };
  get symbolBool() { return this.symbol };
  get turn() { return this.turn };
  get streak() { return this.streak };
  get AI() { return this.AI };


  set name(name) { this.name = name };
  set symbol(symbol) { if (symbol == "O") this.symbol = true; else this.symbol = false; };
  set symbolBool(symbol) { this.symbol = symbol };
  set turn(turn) { this.turn = turn };
  set streak(streak) { this.streak = streak };
  endTurn() { this.turn = !this.turn };
  win() { this.streak++ };

}


class AI {
  static difficulty = "easy";
  static moveCount = 0;

  static set difficulty(difficulty) { this.difficulty = difficulty }
  static get difficulty() { return this.difficulty }

  static moved = () => { this.moveCount++ }

}

class gameBoard {
  static boardState = {
    card1: "",
    card2: "",
    card3: "",
    card4: "",
    card5: "",
    card6: "",
    card7: "",
    card8: "",
    card9: "",
  };

  static get boardState() { return this.boardState; };

  static getValue(card) { return this.boardState[card] };

  static setValue(card, value) {
    if (value == "X" || value == "O" || value == "") {
      this.boardState[card] = value;
      document.getElementById(card).innerText = value;
    }
  };

  static validMoveChecker(card) {
    if (this.getValue(card) == "") {
      return true;
    }
  }
  static possibleMoves() {
    const asArray = Object.entries(this.boardState);
    const filtered = asArray.filter(([key, value]) => this.validMoveChecker(key));
    const justStrings = Object.fromEntries(filtered);
    return justStrings;
  }
  static randomProperty(obj) {
    let keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
  };

  static randomMove() {
    return this.randomProperty(this.possibleMoves());
  }
  static move() { // Random move based on available spaces 
    if (AI.difficulty == "easy") {
      AI.moved();
      return this.randomMove();

    } else if (AI.difficulty == "medium") { // Tries to win
      let symbol = players[1].symbol;

      if (this.getValue("card1") == symbol && this.getValue("card2") == symbol && this.getValue("card3") == "") {
        AI.moved();
        return "card3";
      } else if (this.getValue("card4") == symbol && this.getValue("card5") == symbol && this.getValue("card6") == "") {
        AI.moved();
        return "card6";
      } else if (this.getValue("card7") == symbol && this.getValue("card8") == symbol && this.getValue("card9") == "") {
        AI.moved();
        return "card9";

      } else if (this.getValue("card2") == symbol && this.getValue("card3") == symbol && this.getValue("card1") == "") {
        AI.moved();
        return "card1";
      } else if (this.getValue("card5") == symbol && this.getValue("card6") == symbol && this.getValue("card4") == "") {
        AI.moved();
        return "card4";
      } else if (this.getValue("card8") == symbol && this.getValue("card9") == symbol && this.getValue("card7") == "") {
        AI.moved();
        return "card7";

      } else if (this.getValue("card1") == symbol && this.getValue("card3") == symbol && this.getValue("card2") == "") {
        AI.moved();
        return "card2";
      } else if (this.getValue("card4") == symbol && this.getValue("card6") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";
      } else if (this.getValue("card7") == symbol && this.getValue("card9") == symbol && this.getValue("card8") == "") {
        AI.moved();
        return "card8";

      } else if (this.getValue("card1") == symbol && this.getValue("card5") == symbol && this.getValue("card9") == "") {
        AI.moved();
        return "card9";
      } else if (this.getValue("card5") == symbol && this.getValue("card9") == symbol && this.getValue("card1") == "") {
        AI.moved();
        return "card1";
      } else if (this.getValue("card1") == symbol && this.getValue("card9") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";

      } else if (this.getValue("card3") == symbol && this.getValue("card5") == symbol && this.getValue("card7") == "") {
        AI.moved();
        return "card7";
      } else if (this.getValue("card5") == symbol && this.getValue("car7") == symbol && this.getValue("card3") == "") {
        AI.moved();
        return "card3";
      } else if (this.getValue("card3") == symbol && this.getValue("card7") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";

      } else if (this.getValue("card1") == symbol && this.getValue("card4") == symbol && this.getValue("card7") == "") {
        AI.moved();
        return "card7";
      } else if (this.getValue("card2") == symbol && this.getValue("car5") == symbol && this.getValue("card8") == "") {
        AI.moved();
        return "card8";
      } else if (this.getValue("card3") == symbol && this.getValue("card6") == symbol && this.getValue("card9") == "") {
        AI.moved();
        return "card9";

      } else if (this.getValue("card1") == symbol && this.getValue("card7") == symbol && this.getValue("card4") == "") {
        AI.moved();
        return "card4";
      } else if (this.getValue("card2") == symbol && this.getValue("car8") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";
      } else if (this.getValue("card3") == symbol && this.getValue("card9") == symbol && this.getValue("card6") == "") {
        AI.moved();
        return "card6";

      } else if (this.getValue("card4") == symbol && this.getValue("card7") == symbol && this.getValue("card1") == "") {
        AI.moved();
        return "card1";
      } else if (this.getValue("card5") == symbol && this.getValue("car8") == symbol && this.getValue("card2") == "") {
        AI.moved();
        return "card2";
      } else if (this.getValue("card6") == symbol && this.getValue("card9") == symbol && this.getValue("card3") == "") {
        AI.moved();
        return "card3";


      } else {
        AI.moved();
        return this.randomMove();
      }



    } else if (AI.difficulty == "hard") { // Tries to not let the player to win 
      let symbol = players[0].symbol;

      if (this.getValue("card1") == symbol && this.getValue("card2") == symbol && this.getValue("card3") == "") {
        AI.moved();
        return "card3";
      } else if (this.getValue("card4") == symbol && this.getValue("card5") == symbol && this.getValue("card6") == "") {
        AI.moved();
        return "card6";
      } else if (this.getValue("card7") == symbol && this.getValue("card8") == symbol && this.getValue("card9") == "") {
        AI.moved();
        return "card9";

      } else if (this.getValue("card2") == symbol && this.getValue("card3") == symbol && this.getValue("card1") == "") {
        AI.moved();
        return "card1";
      } else if (this.getValue("card5") == symbol && this.getValue("card6") == symbol && this.getValue("card4") == "") {
        AI.moved();
        return "card4";
      } else if (this.getValue("card8") == symbol && this.getValue("card9") == symbol && this.getValue("card7") == "") {
        AI.moved();
        return "card7";

      } else if (this.getValue("card1") == symbol && this.getValue("card3") == symbol && this.getValue("card2") == "") {
        AI.moved();
        return "card2";
      } else if (this.getValue("card4") == symbol && this.getValue("card6") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";
      } else if (this.getValue("card7") == symbol && this.getValue("card9") == symbol && this.getValue("card8") == "") {
        AI.moved();
        return "card8";

      } else if (this.getValue("card1") == symbol && this.getValue("card5") == symbol && this.getValue("card9") == "") {
        AI.moved();
        return "card9";
      } else if (this.getValue("card5") == symbol && this.getValue("card9") == symbol && this.getValue("card1") == "") {
        AI.moved();
        return "card1";
      } else if (this.getValue("card1") == symbol && this.getValue("card9") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";

      } else if (this.getValue("card3") == symbol && this.getValue("card5") == symbol && this.getValue("card7") == "") {
        AI.moved();
        return "card7";
      } else if (this.getValue("card5") == symbol && this.getValue("car7") == symbol && this.getValue("card3") == "") {
        AI.moved();
        return "card3";
      } else if (this.getValue("card3") == symbol && this.getValue("card7") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";

      } else if (this.getValue("card1") == symbol && this.getValue("card4") == symbol && this.getValue("card7") == "") {
        AI.moved();
        return "card7";
      } else if (this.getValue("card2") == symbol && this.getValue("car5") == symbol && this.getValue("card8") == "") {
        AI.moved();
        return "card8";
      } else if (this.getValue("card3") == symbol && this.getValue("card6") == symbol && this.getValue("card9") == "") {
        AI.moved();
        return "card9";

      } else if (this.getValue("card1") == symbol && this.getValue("card7") == symbol && this.getValue("card4") == "") {
        AI.moved();
        return "card4";
      } else if (this.getValue("card2") == symbol && this.getValue("car8") == symbol && this.getValue("card5") == "") {
        AI.moved();
        return "card5";
      } else if (this.getValue("card3") == symbol && this.getValue("card9") == symbol && this.getValue("card6") == "") {
        AI.moved();
        return "card6";

      } else if (this.getValue("card4") == symbol && this.getValue("card7") == symbol && this.getValue("card1") == "") {
        AI.moved();
        return "card1";
      } else if (this.getValue("card5") == symbol && this.getValue("car8") == symbol && this.getValue("card2") == "") {
        AI.moved();
        return "card2";
      } else if (this.getValue("card6") == symbol && this.getValue("card9") == symbol && this.getValue("card3") == "") {
        AI.moved();
        return "card3";


      } else {
        AI.moved();
        return this.randomMove();
      }
    }
  }

  static resetboardState() {
    for (let i in this.boardState) {
      this.setValue(i.toString(), "");
    }
  };

  static playerWinProcess(index) {
    if (this.checkForWin(players[index].symbol) == players[index].symbol) {
      players[index].win();
      displayController.restart();

    } else if (Object.keys(this.possibleMoves()).length === 0) {
      displayController.restart();
    }

  }
  static processTurn(e) {
    if (this.boardState[e.target.id] == "") {
      if (players[0].turn) {
        this.setValue(e.target.id, players[0].symbol);
        displayController.render();
        this.playerWinProcess(0)
        if (players[1].AI) {
          this.setValue(this.move(), players[1].symbol);
          displayController.render();
          this.playerWinProcess("1")
        } else {

          players[0].endTurn();
          p1Symbol.classList.remove('turn');
          players[1].endTurn();
          p2Symbol.classList.add('turn');

        }
      } else if (players[1].turn) {
        this.setValue(e.target.id, players[1].symbol);
        displayController.render();
        this.playerWinProcess(1)
        players[1].endTurn();
        p2Symbol.classList.remove('turn');
        players[0].endTurn();
        p1Symbol.classList.add('turn');
      }
    }
  }

  static checkForWin(value) {
    if ((this.getValue("card1") == value && this.getValue("card2") == value && this.getValue("card3") == value)
      || (this.getValue("card4") == value && this.getValue("card5") == value && this.getValue("card6") == value)
      || (this.getValue("card7") == value && this.getValue("card8") == value && this.getValue("card9") == value)

      || (this.getValue("card1") == value && this.getValue("card4") == value && this.getValue("card7") == value)
      || (this.getValue("card2") == value && this.getValue("card5") == value && this.getValue("card8") == value)
      || (this.getValue("card3") == value && this.getValue("card6") == value && this.getValue("card9") == value)

      || (this.getValue("card1") == value && this.getValue("card5") == value && this.getValue("card9") == value)
      || (this.getValue("card3") == value && this.getValue("card5") == value && this.getValue("card7") == value)
    ) {

      return value;
    }
  }
}


class displayController {

  static render() {
    let data = gameBoard.boardState;
    for (let i in data) {
      gameBoard.setValue(i.toString(), data[i]);
    }

    p1Score.innerText = players[0].streak;
    p2Score.innerText = players[1].streak;
    p1Symbol.innerText = players[0].symbol;
    p2Symbol.innerText = players[1].symbol;
  };
  static addListener() {
    let data = gameBoard.boardState;
    for (let i in data) {
      document.getElementById(i.toString()).addEventListener("click", (e) => { gameBoard.processTurn(e) });
    }
  };
  static getStartData(e) {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let AIBool
    formProps.AI == "on" ? AIBool = true : AIBool = false;
    let symbol;
    if (formProps.symbol == "O") { symbol = true } else { symbol = false };
    if (AIBool) {
      players.push(new Player("player1", symbol, true))
      players.push(new Player("AI", !symbol, false, true))
      AI.difficulty = formProps.level;
    } else {
      players.push(new Player("player1", symbol, true))
      players.push(new Player("player2", !symbol, false))
    }
    this.render();
    this.addListener();
  };
  static restart() {
    gameBoard.resetboardState();
    this.render();
  }
  static start() {

    players = []
    document.getElementById("modal").style.display = "block";

    gameBoard.resetboardState();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.getStartData(e);
      document.getElementById("modal").style.display = "none";
      document.getElementById("form").reset()
      p2Symbol.classList.remove('turn');

      p1Symbol.classList.add('turn');
      form.reset();
      AIselected.style.display = 'none';
    });

    const AIelement = document.getElementById('AI');

    const AIselected = document.getElementById('AIselected');
    AIelement.addEventListener('click', () => {
      if (AIelement.checked) {
        AIselected.style.display = 'block';
      } else {
        AIselected.style.display = 'none';
      }
    });

    const btn = document.getElementById("restartBtn");
    btn.addEventListener("click", () => { this.start() })




  }
}
displayController.start();





