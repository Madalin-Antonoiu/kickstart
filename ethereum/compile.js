const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//1. Delete entire 'build' folder
const buildPath = path.resolve(__dirname, 'build'); // dynamic refference to build directory
fs.removeSync(buildPath); // included with fs-extra, deletes folder and everything inside it in one line

//2. Read 'Campaign.sol' from the 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

//3. Compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

//4. Recreate build directory if it doesn't exist
fs.ensureDirSync(buildPath);

//5. Take each contract and wite to different file inside build dir
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}