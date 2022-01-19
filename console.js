const input = document.getElementById("input");
const lines = document.getElementById("output");
const aux   = document.getElementById("aux");

document.body.onload = function(){
    input.focus();
}

terminal.addEventListener("click", function (event) {
    input.focus();
});

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        let userInput = getUserInput();
        writeToConsole(1, userInput);
        validateCommand(userInput);
    }
});

function getUserInput() {
    let text = input.value;
    input.value = ""; 
    return text;
}

function validateCommand(text) {
    checkText = text.toUpperCase();
    let command = commands[checkText];
    if (command)
        command.exec();
    else
        commandNotFound(text);
}

function redirect(url){
    writeToConsole(0, "opening in a new tab");
    window.open(url);
}

function writeToConsole(isInput, text) {
    let currentText = lines.innerHTML;
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
    for(const key in commands){
        commands[key].help();
    }
}

function toggleResume() {
    aux.style.display = resumeVisible() ? 'none' : 'block';
}

function resumeVisible() {
    return aux.style.display == 'block';
}

function clearConsole() {
    lines.innerHTML = ">clear"
}

function exitConsole() {
    /*writeToConsole(0, "redirecting to the boring version of the site");*/
    /*window.location.href = "";*/
    writeToConsole(0, "lol jk");
}

const commands = {
    "HELP": {
        help: () => { },
        exec: () => showListOfCommands()
    },
    "RESUME" : {
        help: () => writeToConsole(0, `RESUME    ${resumeVisible() ? "Hide" : "See"} my résumé`),
        exec: () => toggleResume()
    },
    "HEMA-APP": {
        help: () => writeToConsole(0, "HEMA-APP  Tournament Assistant Android app"),
        exec: () => redirect("https://github.com/TonyPacheco/NoDoubles")
    },
    "STAR-LOG": {
        help: () => writeToConsole(0, "STAR-LOG  Astro-Photo session tracking app"),
        exec: () => redirect("http://starlog.azurewebsites.net")
    },
    "LINKEDIN": {
        help: () => writeToConsole(0, "LINKEDIN  Visit my LinkedIn profile"),
        exec: () => redirect("https://www.linkedin.com/in/tony-pacheco")
    },
    "GITHUB": {
        help: () => writeToConsole(0, "GITHUB    Visit my GitHub profile"),
        exec: () => redirect("https://github.com/TonyPacheco")
    },
    "SWORDS": {
        help: () => writeToConsole(0, "SWORDS    See my other hobby"),
        exec: () => redirect("https://www.instagram.com/_tonypacheco/")
    },
    "CONTACT": {
        help: () => writeToConsole(0, "CONTACT   Send me electronic mail"),
        exec: () => redirect("mailto:tonypacheco.cillis@gmail.com")
    },
    "CLEAR": {
        help: () => writeToConsole(0, "CLEAR     Clears the screen"),
        exec: () => clearConsole()
    },
    "EXIT": {
        help: () => writeToConsole(0, "EXIT      Visit my 'regular' site"),
        exec: () => exitConsole()
    }
}
