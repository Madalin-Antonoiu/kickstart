import React from "react"
import factory from '../ethereum/factory';

class CampaignIndex extends React.Component {
    async componentDidMount() {
        const campaigns = await factory.methods.getAllDeployedCampaigns().call();

        console.log(campaigns);
    }

    render() {
        return <h1>Index</h1>
    }
}

export default CampaignIndex;