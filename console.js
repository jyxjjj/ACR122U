const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    eval(`try { ${input} } catch (e) { log(e); }`);
});

rl.on('close', () => {
    process.exit(0);
});

// setTimeout(() => { rl.prompt('>'); }, 1000);
