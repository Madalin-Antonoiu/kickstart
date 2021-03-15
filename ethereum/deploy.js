
const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

// Variables
const provider = new HDWalletProvider(
    process.env.WALLET_SEEDPHRASE,
    process.env.INFURA_RINKEBY_TESTNET_API_KEY
);
const web3 = new Web3(provider);

// Main function
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
        .send({ from: accounts[0] }); // remove gas

    console.log('Contract deployed to', `https://rinkeby.etherscan.io/address/${result.options.address}`);
}

// Run
deploy();


//Deployed to 0xe9291f760b9d291231C57D3A0797A531D68A32Ec