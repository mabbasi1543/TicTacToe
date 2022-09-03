const board = document.getElementById("board");
const form = document.getElementById('form');

const p1Symbol = document.getElementById('p1Symbol');
const p2Symbol = document.getElementById('p2Symbol');

const p1Score = document.getElementById('p1Score');
const p2Score = document.getElementById('p2Score');

const players = [];


const Player = (nameVar , symbolVar , turnVar) => {
    let name = nameVar; 
    let symbol = symbolVar;
    let turn = turnVar; 
    let streak = 0;
    const getName = () => { return name};
    const getSymbol = () => { return symbol ? "O" : "X"};
    const getSymbolBool = () => { return symbol};
    const getTurn = () => { return turn};
    const getStreak = () => { return streak};

    const setName = () => { this.name = name};
    const setSymbol = () => { if (symbol == "O") this.symbol = true; else this.symbol = false; };
    const setSymbolBool = (symbol) => { this.symbol = symbol};
    const setTurn = (turn) => { this.turn = turn};
    const setStreak = (streak) => { this.streak = streak};
    const endTurn = () => { turn =  !turn};
    const win = () => { this.streak++};

    return {
       getName,
       getSymbol,
       getSymbolBool,
       getTurn,
       getStreak,
  
       setName,
       setSymbol,
       setSymbolBool,
       setTurn,
       setStreak,
       endTurn,
       win,
    };
  };


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
        if (value == "X" || value == "O"){
        boardState[card] = value;
        document.getElementById(card).innerText = value;
        }
      };

  const resetboardState = () => {
        for ( i in boardState) {
         setValue(i.toString() , "");
        }
      };

  const processTurn = (e) =>{ 
    if (boardState[e.target.id] == ""){
    console.log(boardState[e.target.id])
    let playerIndex ;
    if(players[0].getTurn()) {
      playerIndex= 0 
      players[0].endTurn();
      p1Symbol.classList.remove('turn');
      players[1].endTurn();
      p2Symbol.classList.add('turn');

    } else {
      playerIndex  =1;
      players[1].endTurn();
      p2Symbol.classList.remove('turn');

      players[0].endTurn();
      p1Symbol.classList.add('turn');

    } 
    
    setValue(e.target.id , players[playerIndex].getSymbol());
    displayController.render(gameBoard)

    }
  }
    return {
     getBoardState,
     getValue,
     setValue,
     resetboardState,
     processTurn,
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
      let AI
      formProps.AI == "on" ? AI = true : AI = false;
      let symbol;
      if(formProps.symbol == "O"){ symbol = true} else {symbol = false};
      if (AI){
        players.push(Player("player1" , symbol , true))
        players.push(Player("AI" , !symbol, false))
      } else {
        players.push(Player("player1" , symbol , true))
        players.push(Player("player2" , !symbol , false))
      }
      render(gameboard);
      addListener(gameboard);
    };

    const start = (gameboard) => {
          gameboard.resetboardState();
          
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            getStartData(e ,gameboard);
            document.getElementById("modal").style.display = "none";
            document.getElementById("form").reset()
            p1Symbol.classList.add('turn');

          });
          
          // Get the modal
          var modal = document.getElementById("modal");
          
          // Get the button that opens the modal
          var btn = document.getElementById("restartBtn");
        

        
        const AI = document.getElementById('AI');
        
        const AIselected = document.getElementById('AIselected');
        
        AI.addEventListener('click', function handleClick() {
          if (AI.checked) {
            AIselected.style.display = 'block';
          } else {
            AIselected.style.display = 'none';
          }
        });
        
        }

    return {
      render,
      start,
    };
  })();

  displayController.start(gameBoard);






  