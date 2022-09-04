const board = document.getElementById("board");
const form = document.getElementById('form');

const p1Symbol = document.getElementById('p1Symbol');
const p2Symbol = document.getElementById('p2Symbol');

const p1Score = document.getElementById('p1Score');
const p2Score = document.getElementById('p2Score');

let players = [];


const Player = (nameVar , symbolVar , turnVar ,AIVar = false) => {
    let name = nameVar; 
    let symbol = symbolVar;
    let turn = turnVar; 
    let streak = 0;
    let AI = AIVar;
    const getName = () => { return name};
    const getSymbol = () => { return symbol ? "O" : "X"};
    const getSymbolBool = () => { return symbol};
    const getTurn = () => { return turn};
    const getStreak = () => { return streak};
    const getAI = () => { return AI};


    const setName = () => { name = name};
    const setSymbol = () => { if (symbol == "O") symbol = true; else symbol = false; };
    const setSymbolBool = (symbol) => { symbol = symbol};
    const setTurn = (turn) => { turn = turn};
    const setStreak = (streak) => { streak = streak};
    const endTurn = () => { turn =  !turn};
    const win = () => { streak++};

    return {
      getName,
      getSymbol,
      getSymbolBool,
      getTurn,
      getStreak,
      getAI,
      setName,
      setSymbol,
      setSymbolBool,
      setTurn,
      setStreak,
      endTurn,
      win,
    };
  };
  const AI = (() => {
    let difficulty = "easy";
    let moveCount = 0;
    const moved = () => {moveCount++}
    
    const setDifficulty = (difficultyVar) => {difficulty = difficultyVar}
    const getDifficulty = () => {return difficulty}


    return {
      moved,
      setDifficulty,
      getDifficulty,
    }
  })();

  const gameBoard = (() => {
    const boardState = {
      card1 : "",
      card2 : "",
      card3 : "",
      card4 : "",
      card5 : "",
      card6 : "",
      card7 : "",
      card8 : "",
      card9 : "",
    };

  const getBoardState = () => {
      return boardState;
    };

  const getValue = (card) =>{ return boardState[card]};
  const setValue = (card , value) =>{ 
        if (value == "X" || value == "O" || value == ""){
        boardState[card] = value;
        document.getElementById(card).innerText = value;
        }
      };
      const validMoveChecker  = (card)=> {
        if (getValue(card) == ""){
          return true;
        }
      }
      const possibleMoves  = ()=> {
        const asArray = Object.entries(boardState);
        const filtered = asArray.filter(([key, value]) => validMoveChecker(key));
        const justStrings = Object.fromEntries(filtered);
        return justStrings;
      }
      const randomProperty = (obj) => {
        let keys = Object.keys(obj);
        return keys[ keys.length * Math.random() << 0];
    };
      const randomMove = () => {
        return randomProperty(possibleMoves());
      }
      const move = () => {
        if (AI.getDifficulty() == "easy"){
          AI.moved();
          return randomMove();
        } else if (AI.getDifficulty() == "medium"){
  
        } else if (AI.getDifficulty() == "hard"){
            let symbol = players[0].getSymbol();
  
            if (getValue("card1") == symbol && getValue("card2") == symbol && getValue("card3") == ""){
              AI.moved();
              return "card3";
            } else if (getValue("card4") == symbol && getValue("card5") == symbol && getValue("card6") == ""){
                  AI.moved();
                return "card6";
            } else if (getValue("card7") == symbol && getValue("card8") == symbol && getValue("card9") == ""){
                  AI.moved();
                return "card9";
  
            } else if (getValue("card2") == symbol && getValue("card3") == symbol && getValue("card1") == ""){
                  AI.moved();
                return "card1";
            } else if (getValue("card5") == symbol && getValue("card6") == symbol && getValue("card4") == ""){
                  AI.moved();
                return "card4";
            } else if (getValue("card8") == symbol && getValue("card9") == symbol && getValue("card7") == ""){
                  AI.moved();
                return "card7";
  
            } else if (getValue("card1") == symbol && getValue("card3") == symbol && getValue("card2") == ""){
                  AI.moved();
                return "card2";
            } else if (getValue("card4") == symbol && getValue("card6") == symbol && getValue("card5") == ""){
                  AI.moved();
                return "card5";
            } else if (getValue("card7") == symbol && getValue("card9") == symbol && getValue("card8") == ""){
                  AI.moved();
                return "card8";
  
            } else if (getValue("card1") == symbol && getValue("card5") == symbol && getValue("card9") == ""){
                  AI.moved();
                return "card9";
            } else if (getValue("card5") == symbol && getValue("card9") == symbol && getValue("card1") == ""){
                  AI.moved();
                return "card1";
            } else if (getValue("card1") == symbol && getValue("card9") == symbol && getValue("card5") == ""){
                  AI.moved();
                return "card5";
  
              } else if (getValue("card3") == symbol && getValue("card5") == symbol && getValue("card7") == ""){
                  AI.moved();
                return "card7";
            } else if (getValue("card5") == symbol && getValue("car7") == symbol && getValue("card3") == ""){
                  AI.moved();
                return "card3";
            } else if (getValue("card3") == symbol && getValue("card7") == symbol && getValue("card5") == ""){
                  AI.moved();
                return "card5";

              } else if (getValue("card1") == symbol && getValue("card4") == symbol && getValue("card7") == ""){
                AI.moved();
              return "card7";
          } else if (getValue("card2") == symbol && getValue("car5") == symbol && getValue("card8") == ""){
                AI.moved();
              return "card8";
          } else if (getValue("card3") == symbol && getValue("card6") == symbol && getValue("card9") == ""){
                AI.moved();
              return "card9";

            } else if (getValue("card1") == symbol && getValue("card7") == symbol && getValue("card4") == ""){
              AI.moved();
            return "card4";
        } else if (getValue("card2") == symbol && getValue("car8") == symbol && getValue("card5") == ""){
              AI.moved();
            return "card5";
        } else if (getValue("card3") == symbol && getValue("card9") == symbol && getValue("card6") == ""){
              AI.moved();
            return "card6";

          } else if (getValue("card4") == symbol && getValue("card7") == symbol && getValue("card1") == ""){
            AI.moved();
          return "card1";
      } else if (getValue("card5") == symbol && getValue("car8") == symbol && getValue("card2") == ""){
            AI.moved();
          return "card2";
      } else if (getValue("card6") == symbol && getValue("card9") == symbol && getValue("card3") == ""){
            AI.moved();
          return "card3";


            } else {
              AI.moved();
              return randomMove();
            }
        }
      }
  const resetboardState = () => {
        for ( i in boardState) {
         setValue(i.toString() , "");
        }
      };
  const playerWinProcess = (index) => {
    if (checkForWin(players[index].getSymbol()) == players[index].getSymbol()) { 
      players[index].win();
      displayController.restart(gameBoard);

    } else if (Object.keys(gameBoard.possibleMoves()).length === 0) {
      displayController.restart(gameBoard);
    }
    
  }
  const processTurn = (e) =>{ 
    if (boardState[e.target.id] == ""){
      if(players[0].getTurn()) {
        setValue(e.target.id , players[0].getSymbol());
        displayController.render(gameBoard);
        playerWinProcess(0)
        if (players[1].getAI()){
          setValue(move() , players[1].getSymbol());
          displayController.render(gameBoard);
          playerWinProcess("1")
        } else {

        players[0].endTurn();
        p1Symbol.classList.remove('turn');
        players[1].endTurn();
        p2Symbol.classList.add('turn');

      }
    }else if(players[1].getTurn()) {
        setValue(e.target.id , players[1].getSymbol());
        displayController.render(gameBoard);
        playerWinProcess(1)
        players[1].endTurn();
        p2Symbol.classList.remove('turn');
        players[0].endTurn();
        p1Symbol.classList.add('turn');
      } 
    }
  }

  const checkForWin = (value) => {
    if((getValue("card1") == value && getValue("card2") == value && getValue("card3") == value)
      || (getValue("card4") == value && getValue("card5") == value && getValue("card6") == value)
      || (getValue("card7") == value && getValue("card8") == value && getValue("card9") == value)
 
      || (getValue("card1") == value && getValue("card4") == value && getValue("card7") == value)
      || (getValue("card2") == value && getValue("card5") == value && getValue("card8") == value)
      || (getValue("card3") == value && getValue("card6") == value && getValue("card9") == value)
 
      || (getValue("card1") == value && getValue("card5") == value && getValue("card9") == value)
      || (getValue("card3") == value && getValue("card5") == value && getValue("card7") == value)
    ) {

      return value;
    }
  }
    return {
     getBoardState,
     getValue,
     setValue,
     resetboardState,
     processTurn,
     possibleMoves,
    };
  })();

  
  const displayController = (() => {

    const render = (gameboard) => {
      let data = gameboard.getBoardState();
      for ( i in data) {
        gameboard.setValue(i.toString() , data[i]);
      }

        p1Score.innerText = players[0].getStreak();
        p2Score.innerText = players[1].getStreak();
        p1Symbol.innerText = players[0].getSymbol();
        p2Symbol.innerText = players[1].getSymbol();
    };
    const addListener = (gameboard) => {
      let data = gameboard.getBoardState();
      for ( i in data) {
        document.getElementById(i.toString()).addEventListener("click" , (e) => {gameboard.processTurn(e)});
      }
    }; 
    const getStartData = (e , gameboard) => {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      let AIBool
      formProps.AI == "on" ? AIBool = true : AIBool = false;
      let symbol;
      if(formProps.symbol == "O"){ symbol = true} else {symbol = false};
      if (AIBool){
        players.push(Player("player1" , symbol , true))
        players.push(Player("AI" , !symbol, false ,true))
        AI.setDifficulty(formProps.level);
      } else {
        players.push(Player("player1" , symbol , true))
        players.push(Player("player2" , !symbol , false))
      }
      render(gameboard);
      addListener(gameboard);
    };
    const restart = (gameboard) => {
      gameboard.resetboardState();

      render(gameboard);
    }
    const start = (gameboard) => {
      
      players = []
      document.getElementById("modal").style.display = "block";
      
      gameboard.resetboardState();
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        getStartData(e ,gameboard);
        document.getElementById("modal").style.display = "none";
        document.getElementById("form").reset()
        p2Symbol.classList.remove('turn');

        p1Symbol.classList.add('turn');

      });

      const AIelement = document.getElementById('AI');
      
      const AIselected = document.getElementById('AIselected');
      AIelement.addEventListener('click', () =>{
        if (AIelement.checked) {
          AIselected.style.display = 'block';
        } else {
          AIselected.style.display = 'none';
        }
      });

      const btn = document.getElementById("restartBtn");
      btn.addEventListener("click" , () => {start(gameboard)})

        

        
        }

    return {
      render,
      start,
      restart
    };
  })();

  displayController.start(gameBoard);





