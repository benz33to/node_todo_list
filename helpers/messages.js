require('colors');

const showMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('======================'.green);
        console.log('   Select an option'.green);
        console.log('======================\n'.green);

        console.log(`${'1.'.green} Create task`);
        console.log(`${'2.'.green} Show tasks`);
        console.log(`${'3.'.green} Show done tasks`);
        console.log(`${'4.'.green} Show pending tasks`);
        console.log(`${'5.'.green} Complete task(s)`);
        console.log(`${'6.'.green} Delete task`);
        console.log(`${'0.'.green} Quit\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question('Select an option: ', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
}

const pause = () => {

    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question(`\nPress ${'ENTER'.green} to continue\n`, (opt) => {
            readLine.close();
        });
    })
}

module.exports = {
    showMenu,
    pause,
};