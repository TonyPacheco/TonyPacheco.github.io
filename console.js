const input = document.getElementById("input");
const lines = document.getElementById("output");
const aux   = document.getElementById("aux");

var process = "shell";
var stack = []
var heap = {}
var historyCursor = -1;

document.body.onload = function(){
    input.focus();
    heap["__history"] = [];
}

terminal.addEventListener("click", function (event) {
    input.focus();
});

input.addEventListener("keyup", function (event) {
    const ENTER_KEY = 13;
    const UP_AR_KEY = 38;
    const DN_AR_KEY = 40;
    if (event.keyCode === ENTER_KEY) {
        let userInput = getUserInput();
        heap["__history"].push(userInput);
        writeToConsole(1, userInput);
        validateCommand(userInput);
        historyCursor = -1;
    }
    else if (event.keyCode === UP_AR_KEY) {
        if (historyCursor <= 0 || historyCursor >= heap["__history"].length) {
            historyCursor = heap["__history"].length - 1;
        }
        else {
            historyCursor--;
        }
        input.value = heap["__history"][historyCursor];
    }
    else if (event.keyCode === DN_AR_KEY) {
        if (historyCursor < 0 || historyCursor >= heap["__history"].length - 1) {
            historyCursor = -1;
            input.value = "";
        }
        else {
            historyCursor++;
            input.value = heap["__history"][historyCursor];
        }
    }
});

function getUserInput() {
    let text = input.value;
    input.value = ""; 
    return text;
}

function validateCommand(text) {
    let command = processes[process][getTokens(text)[0].toUpperCase()];
    if (command) {
        command.exec(text);
    }
    else if (processes[process]["__def"]) {
        processes[process]["__def"].exec(text);
    }
    else {
        commandNotFound(text);
    }
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
    for(const key in processes[process]){
        processes[process][key].help();
    }
}

function startProcess(newProcess) {
    stack.push({
        process: process,
        state: lines.innerHTML,
        heap: heap
    });
    heap = {
        "__history": [],
    }
    lines.innerHTML = "";
    process = newProcess;
    if (processes[process]?.hasOwnProperty("__init"))
        processes[process]["__init"].exec();
}

function endProcess() {
    let prevContext = stack.pop();
    if (!prevContext)
        return;
    lines.innerHTML = prevContext.state;
    process = prevContext.process;
    heap = prevContext.heap;
    lines.scrollTop = lines.scrollHeight;
}

const processes = {
    "shell": {
        "HELP": {
            help: () => { },
            exec: () => showListOfCommands()
        },
        "RESUME": {
            help: () => writeToConsole(0, `RESUME    ${aux.style.display == 'block' ? "Hide" : "See"} my résumé`),
            exec: () => aux.style.display = aux.style.display == 'block' ? 'none' : 'block'
        },
        "HEMA-APP": {
            help: () => writeToConsole(0, "HEMA-APP  Tournament Assistant Android app"),
            exec: () => redirect("https://github.com/TonyPacheco/NoDoubles")
        },
        "STAR-LOG": {
            help: () => writeToConsole(0, "STAR-LOG  Astro-Photo session tracking app"),
            exec: () => redirect("http://app.starlog.online")
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
        "TPRQL": {
            //help: () => writeToConsole(0, "TPRQL     Start the TPRQL interpretor"),
            help: () => { },
            exec: () => startProcess("tprql")
        },
        "JS": {
            help: () => { },
            exec: () => startProcess("js")
        },
        "CLEAR": {
            help: () => writeToConsole(0, "CLEAR     Clears the screen"),
            exec: () => lines.innerHTML = ">clear"
        },
        "EXIT": {
            help: () => writeToConsole(0, "EXIT      Visit my 'regular' site"),
            exec: () => writeToConsole(0, "lol jk")
        }
    },
    "js": {
        "__def": {
            help: () => { },
            exec: (text) => writeToConsole(eval(text))
        },
        "__init": {
            help: () => { },
            exec: () => writeToConsole(0, "DANGER WILL ROBINSON! DANGER!")
        },
        "EXIT": {
            help: () => { },
            exec: () => endProcess()
        }
    },
    "tprql": {
        "__def": {
            help: () => { },
            exec: () => writeToConsole(0, "SYNTAX ERROR")
        },
        "__init": {
            help: () => { },
            exec: () => {
                writeToConsole(0, "== TPRQL INTERPREDITOR ==");
                writeToConsole(0, "Type 'help' for syntax, or 'exit' to return to the shell");
            }
        },
        "HELP": {
            help: () => { },
            exec: () => showListOfCommands()
        },
        "DEF": {
            help: () => writeToConsole(0, "DEF <TYPE:(NUM/STR)> <NAME> <VALUE>"),
            exec: (text) => {
                let tokens = getTokens(text);
                if (tokens.length >= 4) {
                    let name = tokens[2];
                    if (!nameIsValid(name)) {
                        writeToConsole(0, "INVALID NAME: " + name);
                        return;
                    }
                    if (heap.hasOwnProperty(name)) {
                        writeToConsole(0, "VAR [" + name + "] ALREADY DEFINED; TRY `SET`");
                        return;
                    }
                    let typ = tokens[1];
                    if (typ == "num") {
                        let val = tokens[3];
                        let num = Number(val);
                        if (isNaN(num))
                            writeToConsole(0, "INVALID NUM: " + val);
                        else
                            heap[name] = {
                                typ: "num",
                                val: num
                            };
                    }
                    else if (typ == "str") {
                        if (tokens[3][0] != "\"") {
                            writeToConsole(0, "INVALID STR");
                        }
                        else {
                            let quoteIndex = text.indexOf("\"");
                            let str = text.substring(quoteIndex + 1);
                            quoteIndex = str.indexOf("\"");
                            str = str.substring(0, quoteIndex);
                            if (!str.length)
                                writeToConsole(0, "INVALID STR");
                            heap[name] = {
                                typ: "str",
                                val: str
                            };
                        }
                    }
                    else {
                        writeToConsole(0, "INVALID TYPE: " + typ);
                    }
                }
                else {
                    writeToConsole(0, "ERR");
                }
            }
        },
        "SET": {
            help: () => writeToConsole(0, "SET <NAME> <VALUE>"),
            exec: (text) => {
                let tokens = getTokens(text);
                if (tokens.length >= 3) {
                    let name = tokens[1];
                    if (!RegExp("^[a-zA-Z]+$").test(name)) {
                        writeToConsole(0, "INVALID NAME: " + name);
                        return;
                    }
                    if (!heap.hasOwnProperty(name)) {
                        writeToConsole(0, "UNDEFINED: " + name);
                        return;
                    }
                    let typ = heap[name].typ;
                    if (typ == "str") {
                        let quoteIndex = text.indexOf("\"");
                        let str = text.substring(quoteIndex + 1);
                        quoteIndex = str.indexOf("\"");
                        str = str.substring(0, quoteIndex);
                        if (!str.length)
                            writeToConsole(0, "INVALID STR");
                        heap[name].val = str;
                    }
                    else if (typ == "num") {
                        let val = tokens[2];
                        let num = Number(val);
                        if (isNaN(num))
                            writeToConsole(0, "INVALID NUM: " + val);
                        else
                            heap[name].val = num;
                    }
                    else {
                        //?
                    }
                }
                else {
                    writeToConsole(0, "ERR");
                }
            }
        },
        "GET": {
            help: () => writeToConsole(0, "GET <NAME>"),
            exec: (text) => {
                let tokens = getTokens(text);
                if (tokens.length == 2) {
                    let name = tokens[1];
                    if (!nameIsValid(name))
                        writeToConsole(0, "INVALID NAME: " + name);
                    else if (!heap.hasOwnProperty(name))
                        writeToConsole(0, "UNDEFINED : " + name);
                    else
                        writeToConsole(0, heap[name].val);
                }
                else {
                    writeToConsole(0, "ERR");
                }
            }
        },
        "DEL": {
            help: () => writeToConsole(0, "DEL <NAME>"),
            exec: (text) => {
                let tokens = getTokens(text);
                if (tokens.length == 2) {
                    let name = tokens[1];
                    if (!nameIsValid(name))
                        writeToConsole(0, "INVALID NAME: " + name);
                    else if (!heap.hasOwnProperty(name))
                        writeToConsole(0, "UNDEFINED : " + name);
                    else
                        delete heap[name];
                }
                else {
                    writeToConsole(0, "ERR");
                }
            }
        },
        "EXIT": {
            help: () => writeToConsole(0, "EXIT"),
            exec: () => {
                endProcess();
            }
        }
    }
}

function getTokens(text) {
    return text.split(' ');
}

function nameIsValid(name) {
    const nameRegex = RegExp("^[a-zA-Z]+$");
    return nameRegex.test(name);
}
