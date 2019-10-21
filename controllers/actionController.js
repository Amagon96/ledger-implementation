const sprintf =require("sprintf-js").sprintf;
const ACCOUNT_CURRENCY = new RegExp('[a-zA-z]{3}');
const ACCOUNT_AMOUNT = new RegExp('/[\\-.|\\d]/');
const SUPERIOR_ACCOUNT = new RegExp('/^\\w+/');

let balances = {};
let transactions = {};
let transactionSum = {};
let amount = 0.0;
let description = "";
let currency = "";
let movements = [];

/*
USD_CURRENCY         = 'USD'.freeze
TWO_DECIMALS         = '%.2f'.freeze
EMPTY_SPACE          = ' '.freeze
 */

/*
 * Do the balance of a file.
 */
function balance(transactions){

    console.log(sprintf("%5j", transactions));

    transactions.map((transaction) =>{
        movements = transaction.accounts;
        movements.map((movement) => {
           amount = movement.amount;
           description = movement.description;
           currency = movement.currency;

            if (balances.hasOwnProperty(description)) {
                balances[description][0] += amount;
            } else {
                balances[description] += [amount, currency];
            }
        });
    });
}

function register(file){

}

function version(file) {

}

function print(file){

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