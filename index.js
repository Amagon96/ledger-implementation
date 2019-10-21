const minimist = require('minimist');
const cmdController = require("./controllers/cmdController");

const args = minimist(process.argv.slice(2));

let cmd = args._[0];

if (cmd === "b" || cmd === "bal" || cmd === "balance") {
  cmd = "balance";
} else if (cmd === "p" || cmd === "print") {
  cmd = "print";
} else if (cmd === "r" || cmd === "reg" || cmd === "register") {
  cmd = "register";
} else if (args.version || args.v) {
  cmd = "version";
}

switch (cmd) {
  case "balance":
    cmdController.balanceCommand(args);
    break;

  case "print":
    cmdController.printCommand(args);
    break;

  case "register":
    cmdController.registerCommand(args);
    break;

  case "version":
    cmdController.versionCommand(args);
    break;

  default:
    console.error(`"${cmd}" is not a valid command!`)
    break;
}
