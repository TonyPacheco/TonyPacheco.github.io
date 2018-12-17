var input = document.getElementById("input");
var lines = document.getElementById("output");

function intro() {
    lines.innerHTML = "Welcome to Tony Pacheco\'s personal website!";
    writeToConsole(0, "You can type 'help' for a list of commands");
    writeToConsole(0, "or 'exit' if you don't love terminals like Tony");
    writeToConsole(0, "(c) Tony Pacheco 2018");
    input.focus();
}

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var userInput = getUserInput();
        writeToConsole(1, userInput);
        validateCommand(userInput);
    }
});

terminal.addEventListener("click", function(event){
    input.focus();
});

function getUserInput() {
    var text = input.value;
    input.value = ""; 
    return text;
}

function validateCommand(text) {
    checkText = text.toLowerCase();
    if(checkText === "help") {
        showListOfCommands();
        return;
    }
    if(checkText === "resume") {
        showAsciiResume();
        return;
    }
    if(checkText === "snsapp") {
        showSeekNSolve();
        return;
    }
    if(checkText === "mealio") {
        showMealio();
        return;
    } 
    if(checkText === "linkedin") {
        writeToConsole(0, "opening in a new tab");
        window.open("https://www.linkedin.com/in/tony-pacheco");
        return;
    } 
    if(checkText === "github") {
        writeToConsole(0, "opening in a new tab");
        window.open("https://github.com/TonyPacheco");
        return;
    } 
    if(checkText === "clear") {
        lines.innerHTML = ">clear";
        return;
    }
    if(checkText === "exit") {
        writeToConsole(0, "redirecting to the boring version of the site");
        window.location.href = "";
        return;
    }
    commandNotFound(text);
}

function writeToConsole(isInput, text) {
    var currentText = lines.innerHTML;
    if(isInput){
        text = ">" + text
    }
    lines.innerHTML = currentText + "\n" + text;
    lines.scrollTop = lines.scrollHeight;
}

function commandNotFound(text) {
    writeToConsole(0, "command \'" + text + "\' not found");
}

function showListOfCommands() {
    writeToConsole(0, "");
    writeToConsole(0, "RESUME    See Tony's resume");
    writeToConsole(0, "SNSAPP    Seek N Solve Android app");
    writeToConsole(0, "MEALIO    Food management web app");
    writeToConsole(0, "LINKEDIN  Visit Tony's LinkedIn profile");
    writeToConsole(0, "GITHUB    Visit Tony's GitHub profile");
    writeToConsole(0, "CLEAR     Clears the screen")
    writeToConsole(0, "EXIT      Visit Tony's 'regular' site");
}

function showAsciiResume() {
    writeToConsole(0, "WIP");
}

function showSeekNSolve() {
    writeToConsole(0, "WIP");
}

function showMealio() {
    writeToConsole(0, "WIP");
}