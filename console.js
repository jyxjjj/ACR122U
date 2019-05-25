const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (input) {
    eval(input);
    rl.prompt('>');
});

rl.on('close', function () {
    process.exit(0);
});

rl.prompt('>');
