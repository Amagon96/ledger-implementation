const TRANSACTION = new RegExp('/\\d{4}\\/\\d{1,2}\\/\\d{1,2} .+/');
const TRANSACTION_DATE = new RegExp('\\d{4}\\/\\d{1,2}\\/\\d{1,2}');
const TRANSACTION_DESC = new RegExp('[^\\d{4}\\/\\d{1,2}\\/\\d{1,2}]+');
const ACCOUNT_DESC = new RegExp('[^\\-?\\$?\\d+\\.?\\d+$]+');
const ACCOUNT_MOVEMENT_TYPE = new RegExp('\\-?\\$?\\d+\\.?\\d?.+');
const ACCOUNT_CURRENCY = new RegExp('[a-zA-z]{3}');
const COMMENT = new RegExp('[\;#%|*].+');
const sprintf = require('sprintf-js').sprintf;
/*
    Parse lines to data objects
 */
function parser(lines, fileSize){
    let isTransaction = false;
    let transactions = [];
    let transaction = {accounts: []};
    let account = {};
    let accumulatesAmount = 0.0;
    let movement = "";
    let amount = 0.0;
    let currency = "";

    let actualLine = 0;

    lines.forEach((line, index) => {

        line = line.toString();

        if (!COMMENT.test(line) && line !== '') {
            if (!TRANSACTION.test(line) && !line.startsWith("!include")) {

                if(line.match(TRANSACTION_DATE)){
                    if(isTransaction){
                        transactions.push(transaction);
                        accumulatesAmount = 0.0;
                        transaction = {accounts: []}
                    }

                    isTransaction = true;
                    transaction.date = TRANSACTION_DATE.exec(line).toString();
                    transaction.description = TRANSACTION_DESC.exec(line).toString().trim();
                    return;
                }

                if(isTransaction){
                    movement = line.match(ACCOUNT_MOVEMENT_TYPE);
                    amount = movement ? movement.toString().replace('$','') : null;

                    if(movement){
                        if(ACCOUNT_CURRENCY.test(movement)){
                            currency = ACCOUNT_CURRENCY.exec(movement).toString();
                        }else{
                            currency = "USD";
                        }
                    }

                    account.amount = amount ? parseFloat(amount) : - accumulatesAmount;
                    account.description = ACCOUNT_DESC.exec(line).toString().trim();
                    account.currency = currency;
                    transaction.accounts.push(account);
                    accumulatesAmount += account.amount;
                    account = {};
                }

                if(index === fileSize-1){
                    transactions.push(transaction);
                }
            }
        }
    });
    //console.log(sprintf("%5j",transactions));
    return transactions;
}

module.exports = {
    parser
};