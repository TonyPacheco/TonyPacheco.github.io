var input = document.getElementById("input");
var lines = document.getElementById("output");
var aux   = document.getElementById("aux");

function intro() {
    lines.innerHTML = "Welcome to Tony Pacheco\'s personal website!";
    writeToConsole(0, "You can type 'help' for a list of commands");
    writeToConsole(0, "or 'exit' if you don't love terminals like Tony");
    writeToConsole(0, "(c) Tony Pacheco " + new Date().getFullYear());
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
    }
    else if(checkText === "resume") {
        toggleResume();
    }
    else if(checkText === "hema-app") {
        redirect("https://github.com/TonyPacheco/NoDoubles");
    }
    else if(checkText === "mealio") {
        redirect("http://mealio.tk");
    } 
    else if(checkText === "linkedin") {
        redirect("https://www.linkedin.com/in/tony-pacheco");
    } 
    else if(checkText === "github") {
        redirect("https://github.com/TonyPacheco");
    } 
    else if(checkText === "swords") {
        redirect("https://www.instagram.com/_tonypacheco/");
    }
    else if(checkText === "clear") {
        lines.innerHTML = ">clear";
    }
    else if(checkText === "exit") {
        exitConsole();
    }
    else{
        commandNotFound(text);
    }
}

function redirect(url){
    writeToConsole(0, "opening in a new tab");
    window.open(url);
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
    if (aux.style.display == 'none'){
        writeToConsole(0, "RESUME    See Tony's resume");
    }
    else{
        writeToConsole(0, "RESUME    Hide Tony's resume");
    }
    writeToConsole(0, "HEMA-APP  Tournament Assistant Android app");
    writeToConsole(0, "MEALIO    Food management web app");
    writeToConsole(0, "LINKEDIN  Visit Tony's LinkedIn profile");
    writeToConsole(0, "GITHUB    Visit Tony's GitHub profile");
    writeToConsole(0, "SWORDS    See Tony's other hobby");
    writeToConsole(0, "CLEAR     Clears the screen");
    writeToConsole(0, "EXIT      Visit Tony's 'regular' site");
}

function toggleResume() {
    aux.style.display = (aux.style.display == 'none') ? 'block' : 'none';
}

function exitConsole() {
    /*writeToConsole(0, "redirecting to the boring version of the site");*/
    /*window.location.href = "";*/
    writeToConsole(0, "lol jk");
}
