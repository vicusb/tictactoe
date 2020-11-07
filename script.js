
//Starting screen: Game Menu
const gameMenu = (() => {
    const form = document.querySelector(".form");
    const ticimage = document.querySelector("#ticimage");
    const overlay = document.querySelector(".overlay");
    const table = document.querySelector(".table");
    const newGame = document.querySelector("#newGame");


    const showGameMenu = () => {
        overlay.classList.remove("hide");
        overlay.classList.add("fade-in");
        overlay.classList.remove("fade-out");
        newGame.classList.add("hide");

        form.classList.add("bounce-in-top");
        form.classList.remove("slide-out-blurred-top");
        ticimage.classList.add("bounce-in-top");
        ticimage.classList.remove("slide-out-blurred-top");
    }

    const hideGameMenu = () => {
        form.classList.toggle("slide-out-blurred-top");
        ticimage.classList.toggle("slide-out-blurred-top");
        newGame.classList.remove("hide");
        overlay.classList.remove("fade-in");
        overlay.classList.add("fade-out");

        overlay.addEventListener("animationend", (e) => {
            if (e.animationName === "fade-out") {
                overlay.classList.add("hide");
                table.classList.remove("hide");
                table.classList.add("fade-in");
            }
        })
    }
    return { showGameMenu, hideGameMenu }
})();


const Player = (name, mark) => {
    let points = 0;

    const increasePoints = () => ++points;
    const getPoints = () => points;
    const getMark = () => mark;
    const getName = () => name;

    return { increasePoints, getPoints, getMark, getName }
}

const Gameboard = (function () {
    let p1Points = document.getElementById("player1points");
    let p2Points = document.getElementById("player2points");
    let tiePoints = document.getElementById("tiepoints");
    let gameboard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const message1 = document.getElementById("message1");
    const message2 = document.getElementById("message2");
    const message3 = document.getElementById("message3");
    const squares = document.querySelectorAll(".square");
    const overlay = document.querySelector(".overlay");
    let ties = 0;
    let turn = 0;
    let turns = 0;

    const writePoints = (player1, player2) => {
        p1Points.innerHTML = "<span class='x'>X </span>" + player1.getName() + ": " + player1.getPoints();
        p2Points.innerHTML = "<span class='o'>O </span>" + player2.getName() + ": " + player2.getPoints();
        tiePoints.innerHTML = "Ties: " + ties;
    }

    const turnHighlight = (turn) => {
        if (turn % 2 === 0) {
            p1Points.classList.add("turn");
            p2Points.classList.remove("turn");
        } else {
            p1Points.classList.remove("turn");
            p2Points.classList.add("turn");
        }
    }

    const updateGameboard = (id, mark) => {
        switch (id) {
            case "nw":
                gameboard[0][0] = mark;
                break;
            case "n":
                gameboard[0][1] = mark;
                break;
            case "ne":
                gameboard[0][2] = mark;
                break;
            case "w":
                gameboard[1][0] = mark;
                break;
            case "o":
                gameboard[1][1] = mark;
                break;
            case "e":
                gameboard[1][2] = mark;
                break;
            case "sw":
                gameboard[2][0] = mark;
                break;
            case "s":
                gameboard[2][1] = mark;
                break;
            case "se":
                gameboard[2][2] = mark;
                break;
        }

    }

    const getGameboard = () => console.log(gameboard);

    const winningCondition = (turn, turns) => {
         if ((gameboard[0][0] === gameboard[0][1]) && (gameboard[0][0] === gameboard[0][2]) || (gameboard[1][0] === gameboard[1][1]) && (gameboard[1][0] === gameboard[1][2]) || (gameboard[2][0] === gameboard[2][1]) && (gameboard[2][0] === gameboard[2][2]) || (gameboard[0][0] === gameboard[1][0]) && (gameboard[0][0] === gameboard[2][0]) || (gameboard[0][1] === gameboard[1][1]) && (gameboard[0][1] === gameboard[2][1]) || (gameboard[0][2] === gameboard[1][2]) && (gameboard[0][2] === gameboard[2][2]) || (gameboard[0][0] === gameboard[1][1]) && (gameboard[0][0] === gameboard[2][2]) || (gameboard[0][2] === gameboard[1][1]) && (gameboard[0][2] === gameboard[2][0])) {
            if (turns % 2 === 0) {
                overlay.classList.toggle("hide");
                message1.classList.remove("hide");
                message1.classList.add(".slide-in-blurred-left");
                message1.innerHTML = "<section>"+ player1.getName() + " WON!"+ "</section><section>Click here to continue playing!</section>";
            } else {
                overlay.classList.toggle("hide");
                message2.classList.remove("hide");
                message2.classList.add(".slide-in-blurred-left");
                message2.innerHTML = "<section>"+ player2.getName() + " WON!"+ "</section><section>Click here to continue playing!</section>";
            }
        } else if (turn === 8) {
            overlay.classList.toggle("hide");
            message3.classList.remove("hide");
            message3.classList.add(".slide-in-blurred-left");
            message3.innerHTML = "<section>DRAW!</section><section>Click here to continue playing!</section>";
        }
    }

    const resetGameboard = () => {
        gameboard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        turn = 0;
    }

    const resetTies = () => {
        ties = 0;
        turns = 0;
    }
    const gameLogic = () => {


        squares.forEach(square => square.addEventListener("click", function () {


            if (turns % 2 === 0) {

                if (!square.classList.contains("x") && !square.classList.contains("o")) {
                    square.classList.add("x");
                    square.innerHTML = "X";
                    Gameboard.updateGameboard(square.id, player1.getMark());
                    Gameboard.getGameboard();
                    Gameboard.winningCondition(turn++,turns++);
                    console.log(turns);


                }

            } else {

                if (!square.classList.contains("x") && !square.classList.contains("o")) {
                    square.classList.add("o");
                    square.innerHTML = "O";
                    Gameboard.updateGameboard(square.id, player2.getMark());
                    Gameboard.getGameboard();
                    Gameboard.winningCondition(turn++,turns++);
                    console.log(turns);
                }
            }

        }));
    }

    const increaseTies = () => ties++;


    return {
        writePoints,
        turnHighlight,
        updateGameboard,
        getGameboard,
        winningCondition,
        resetGameboard,
        gameLogic,
        increaseTies,
        resetTies
    }
})();

function startGame() {

    const human = document.getElementById("human").checked;

    if (human === true) {
        player1 = Player(document.querySelector("#player1").value, "x");
        player2 = Player(document.querySelector("#player2").value, "o");
    } else {
        player1 = Player(document.querySelector("#player1").value, "x");
        player2 = Player("CPU", "o");
    }

    Gameboard.writePoints(player1, player2, 0);

}

function resetBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.innerHTML = "";
        square.classList.remove("x");
        square.classList.remove("o");
    });
}

document.addEventListener("DOMContentLoaded", gameMenu.showGameMenu);

document.querySelector("button").addEventListener("click", () => {
    console.log("Y");
    const human = document.getElementById("human").checked;
    if(human === true){
        if (document.getElementById('player1').validity.valid && document.getElementById('player2').validity.valid) {
            startGame();
            gameMenu.hideGameMenu();
        } else {
            alert("Please put both of your names!");
        }
    } else {
        if (document.getElementById('player1').validity.valid) {
            startGame();
            gameMenu.hideGameMenu();
        } else {
            alert("Please put your name!");
        }
    }
    

});


document.querySelector("#message1").addEventListener("click", () => {
    document.querySelector(".overlay").classList.toggle("hide");
    message1.classList.add("hide");
    message1.classList.remove(".slide-in-blurred-left");
    player1.increasePoints();
    Gameboard.writePoints(player1, player2);
    resetBoard();
    Gameboard.resetGameboard();

});

document.querySelector("#message2").addEventListener("click", () => {
    document.querySelector(".overlay").classList.toggle("hide");
    message2.classList.add("hide");
    message2.classList.remove(".slide-in-blurred-left");
    player2.increasePoints();
    Gameboard.writePoints(player1, player2);
    resetBoard();
    Gameboard.resetGameboard();

});

document.querySelector("#message3").addEventListener("click", () => {
    document.querySelector(".overlay").classList.toggle("hide");
    message3.classList.add("hide");
    message3.classList.remove(".slide-in-blurred-left");
    Gameboard.increaseTies();
    Gameboard.writePoints(player1, player2);
    resetBoard();
    Gameboard.resetGameboard();

});

const gamemode = document.getElementsByName("gamemode");

gamemode.forEach(mode => mode.addEventListener("click", function () {
    if (this.id === "human") {
        document.getElementById("player2").classList.remove("none");
        document.getElementById("player2label").classList.remove("none");
    } else {
        document.getElementById("player2").classList.add("none");
        document.getElementById("player2label").classList.add("none");
    }

}))

document.querySelector("#newGame").addEventListener("click", ()=>{
    gameMenu.showGameMenu();
    resetBoard();
    Gameboard.resetTies();
    Gameboard.resetGameboard();
})


Gameboard.gameLogic();
