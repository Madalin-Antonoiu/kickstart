import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xe9291f760b9d291231C57D3A0797A531D68A32Ec'
);

export default instance;