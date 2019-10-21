const sprintf =require("sprintf-js").sprintf;

let amount = 0.0;
let description = "";
let currency = "";
let date = "";
let groups = {};
let keys = [];

/*
 * Do the balance of a file.
 */
function balance(transactions){
    groups = {};
    let balanceObject = {};
    transactions.map((transaction) =>{
        let movements = transaction.accounts;
        movements.map((movement) => {
            amount = movement.amount;
            description = movement.description;
            currency = movement.currency;

            if (balanceObject.hasOwnProperty(description)) {
                balanceObject[description][0] += amount;
            } else {
                balanceObject[description] = [amount, currency];
            }
        });
    });

    keys = Object.keys(balanceObject);

    for (let key in keys) {
        currency = balanceObject[keys[key]][1];
        if (groups.hasOwnProperty(currency)){
            groups[currency] += balanceObject[keys[key]][0]
        } else {
            groups[currency] = balanceObject[keys[key]][0]
        }
    }

    for (let key in keys){
        console.log(sprintf("%20s %5s",  `${balanceObject[keys[key]][1] } ${ balanceObject[keys[key]][0]}`, keys[key]));
    }
    console.log('--------------------')

    for (let key in groups) {
        if (groups.hasOwnProperty(key)) {
            console.log(sprintf("%20s %5s",key, groups[key]));
        }
    }
}

function register(transactions, sort){
    groups = {};
    let registerObject = [];
    transactions.map((transaction) => {
        date = transaction.date;
        date = date.replace(/\//g,'-');
        description = transaction.description;
        console.log(`${date} ${description}`);
        let movements = transaction.accounts;
        movements.map((movement) => {
            amount = movement.amount;
            currency = movement.currency;
            description = movement.description;

            if(groups.hasOwnProperty(currency)){
                groups.currency += amount;
            } else {
                groups.currency = amount;
            }

            console.log(sprintf("%50s %10s %1.2f %20s %1.2f", description, currency, amount, currency, groups.currency));
        });

        for (let group in groups) {
            console.log(sprintf("%88s %1.2f", group,  groups[group]));
        }
    });

}

function version(file) {

}

function print(transactions, sort){
    transactions.map((transaction) => {
        console.log(`${transaction.date} ${transaction.description}`);
        transaction.accounts.map((account) => {
            console.log(sprintf("%70s %30.2f", account.description, account.amount));
        });
    });

}

function help(file){

}

module.exports = {
    balance,
    register,
    version,
    print,
    help
};