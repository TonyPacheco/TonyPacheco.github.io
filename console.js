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
    if(checkText === "linkedin") {
        window.location.href = "https://www.linkedin.com/in/tony-pacheco";
        return;
    } 
    if(checkText === "github") {
        window.location.href = "https://github.com/TonyPacheco";
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
    writeToConsole("RESUME     See Tony's resume");
    writeToConsole("SNSAPP     Seek N Solve Android app");
    writeToConsole("MEALIO     Food management web app");
    writeToConsole("LINKEDIN   Visit Tony's LinkedIn profile");
    writeToConsole("GITHUB     Visit Tony's GitHub profile");
}

function showAsciiResume() {
    writeToConsole("WIP");
}

function showSeekNSolve() {
    writeToConsole("WIP");
}

function showMealio() {
    writeToConsole("WIP");
}