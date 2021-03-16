import React from "react"
import factory from '../ethereum/factory';

class CampaignIndex extends React.Component {
    static async getInitialProps() { //with static we skip component rendering
        const campaigns = await factory.methods.getAllDeployedCampaigns().call();
        return { campaigns }
    }

    render() {
        return <div>
            <h1>Hi</h1>
            <h1>{this.props.campaigns[0]}</h1>
            {/* <h1>{this.props.campaigns[0]}</h1>  */}
        </div>
    }
}

export default CampaignIndex;