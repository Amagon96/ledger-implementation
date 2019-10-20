const minimist = require('minimist');
const cmdsController = require('/controllers/cmds');

function cli(){
  const args = minimist(process.argv.slice(2));

  let cmd = args._[0] || 'help';

  if (cmd === 'b' || cmd === 'bal') {
    cmd = 'balance'
  }

  if (cmd === 'p') {
    cmd = 'print'
  }

  if (cmd === 'r' || cmd === 'reg') {
    cmd = 'register'
  }

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  console.log(cmd);
}

module.exports = {
  cli
};