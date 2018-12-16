var input = document.getElementById("input");
var lines = document.getElementById("output");

function intro() {
    lines.innerHTML = "Welcome to Tony Pacheco\'s personal website!";
    writeToConsole("You can type 'help' for a list of commands.");
    writeToConsole("(c) Tony Pacheco 2018");
}

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var userInput = getUserInput();
        writeToConsole(userInput);
        validateCommand(userInput);
    }
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
    commandNotFound(text);
}

function writeToConsole(text) {
    var currentText = lines.innerHTML;
    lines.innerHTML = currentText + "\n" + text;
    lines.scrollTop = lines.scrollHeight;
}

function commandNotFound(text) {
    writeToConsole("command \'" + text + "\' not found");
}

function showListOfCommands() {
    writeToConsole("");
    writeToConsole("RESUME   see Tony's resume");
    writeToConsole("SNSAPP   Seek N Solve Android app");
    writeToConsole("MEALIO   Food management web app");
}

function showAsciiResume() {

}

function showSeekNSolve() {

}

function showMealio() {

}