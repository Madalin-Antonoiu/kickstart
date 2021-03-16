import Web3 from 'web3';

let web3;


if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and Metamask is running
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();

} else {
    // We are not on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        process.env.INFURA_RINKEBY_TESTNET_API_KEY
    );

    web3 = new Web3(provider);

}

export default web3;