import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import config from './config.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    config.DEPLOYED_FACTORY_ADDRESS
);

export default instance;