const minimist = require("minimist");
const cmdsController = require("/controllers/cmdController");

function cli(){
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0];

  if (cmd === "b" || cmd === "bal") {
    cmd = "balance";
  } else if (cmd === "p") {
    cmd = "print";
  } else if (cmd === "r" || cmd === "reg") {
    cmd = "register";
  } else if (args.version || args.v) {
    cmd = "version";
  }else{
    cmd = "help";
  }

  switch (cmd) {
    case "balance":
      cmdsController.balance(args);
      break;

    case "print":
      cmdsController.print(args);
      break;

    case "register":
      cmdsController.register(args);
      break;

    case "version":
      cmdsController.version(args);
      break;

    default:
      cmdsController.help(args);
      break;
  }
}

module.exports = {
  cli
};