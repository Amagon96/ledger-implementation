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
    //const sort = args.sort ? args.sort : "";

    if(!file){
        files.map((element) => {readFile(element)});
    }else{
        i = 5;
        readFile(file);
    }
}

function printCommand(){

}
function registerCommand(){

}

function versionCommand(){

}

function readFile(file) {
    if(!file.includes(".ledger")){
        file += ".ledger";
    }

    if(!file.includes("records")){
        file = "records/" + file;
    }

    let fileLength = 0;

    fileSystem.readFile(file, 'utf8', (err, contents) =>{

        if (contents) {
            fileLength = (contents.split('\n').length-1 );
        }else {
            console.error(err.message);
            return;
        }

        if(fileLength > 0){
            let lines = contents.split('\n');
            let parsedFile = parser.parser(lines, fileLength);
            if(i === 5){
                actionController.balance(parsedFile);
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