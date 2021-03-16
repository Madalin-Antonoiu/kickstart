import React from "react"
import factory from '../ethereum/factory';

import 'semantic-ui-css/semantic.min.css'
import { Card, Button } from "semantic-ui-react";


class CampaignIndex extends React.Component {
    static async getInitialProps() { //with static we skip component rendering
        const campaigns = await factory.methods.getAllDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return <div>
            <div>{this.renderCampaigns()}</div>
            <Button content='Create Campaign' icon='add circle' primary
            />
        </div>
    }
}

export default CampaignIndex;