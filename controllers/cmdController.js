const parser = require('../parser');
const actionController = require('./actionController');
const fileSystem = require('fs');
//TODO Implement colors for terminal
//const chalk = require('chalk');

// TODO implement index.ledger instead of actuall
const files = ['Income.ledger', 'Expenses.ledger', 'Payable.ledger', 'Receivable.ledger', 'Bitcoin.ledger'];

let i = 1;

function balanceCommand(args){
    const file = args._[1];

    if(typeof file === "undefined"){
        console.log("Please provide a valid file name");
        return;
        files.map((element) => {
            readFile(element, "balance");
        });
    }else{
        i = 5;
        readFile(file, "balance");
    }
}

function printCommand(args){
    const file = args._[1];

    if(!file){
        console.log("Please provide a valid file name");
        return;
        files.map((element) => {readFile(element, "print")});
    }else{
        i = 5;
        readFile(file, "print");
    }
}
function registerCommand(args){
    const file = args._[1];

    if(!file){
        console.log("Please provide a valid file name");
        return;
        files.map((element) => {
            readFile(element, "register");
        });
    }else{
        i = 5;
        readFile(file, "register");
    }
}

function versionCommand(){
    console.log("v 1.0.0");
}

function readFile(file, command) {
    if(!file.includes(".ledger")){
        file += ".ledger";
    }

    if(!file.includes("records")){
        file = "records/" + file;
    }

    let fileLength = 0;
    let lines = "";
    let parsedFile = {};

    fileSystem.readFile(file, 'utf8', (err, contents) =>{

        if (contents) {
            fileLength = (contents.split('\n').length-1 );
        }else {
            console.error(err.message);
            return;
        }

        if(fileLength > 0){
            lines = contents.split('\n');
            parsedFile = parser.parser(lines, fileLength);
            if(i === 5){
                switch (command) {
                    case "balance" :
                        actionController.balance(parsedFile);
                        break;
                    case "register" :
                        actionController.register(parsedFile);
                        break;
                    case "print" :
                        actionController.print(parsedFile);
                        break;
                    default :
                        console.log(`${cdm} is not a valid command`);
                }
            }
            i++;
        }
    });
    return file;
}

module.exports = {
    balanceCommand,
    registerCommand,
    versionCommand,
    printCommand
};