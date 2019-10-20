const TRANSACTION = new RegExp('\d{4}\/\d{1,2}\/\d{1,2} .+');
const TRANSACTION_DATE = new RegExp('\d{4}\/\d{1,2}\/\d{1,2}');
const TRANSACTION_DESC = new RegExp('[^\d{4}\/\d{1,2}\/\d{1,2}]+');
const ACCOUNT_ACTION = new RegExp('\-?\$?\d+\.?\d?.+');
const ACCOUNT_CURRENCY = new RegExp('[a-zA-z\$]+');
const COMMENT = new RegExp('[\;#%|*].+');
const LEDGER_FILE = new RegExp ('[\w\/]+\.ledger$');
let firstTime = true;


function parser(lines, file){
    let nextFile = "";
    let isTransaction = false;
    var transaction = {};
    var account = {};
    var transactionsArray = []
    var acumulateAmount = 0;
    let movement = "";
    let amount = 0.0;
    let currency = "";

    if (firstTime) {
        parsed_file = [];
        firstTime = false;
    }

    lines.forEach(function (line, index){
        line = line.toString('ascii');

        if (COMMENT.test(line)) {
            return;
        }

        if (line.startsWith('!include')) {
            nextFile = line.replace(LEDGER_FILE);
            parsed_file |= parser(nextFile);
        }

        if (TRANSACTION.test(line)) {
            if (isTransaction) {
                parsed_file.push(transaction);
                acumulateAmount = 0;
            }

            isTransaction = true;
            transaction = {account: []};
            transaction.date = line.match(TRANSACTION_DATE)[1];
            transaction.description = line.match(TRANSACTION_DESC)[1].trim();

            return;
        }

        if (isTransaction) {
            movement = line.match(ACCOUNT_ACTION)[1];
            amount = movement ? movement.replace('$', '') : 0;
            currency = movement ? movement[0].match(ACCOUNT_CURRENCY) : "USD";

            account.description = line.match(accountDesc).trim();
            account.amount = amount ? parseFloat(amount) : -acumulateAmount;
            account.currency = currency ? currency[0] : "USD";
            transaction.account.push(account);

            acumulateAmount += account.amount;

            account = {};
        }

        if (index === file - 1){
            transactionsArray.push(transaction)
        }
    });
    return transactionsArray;
}

function mapping(){
    console.log("This is just a test");
}

module.exports = {
    parser,
    mapping
};