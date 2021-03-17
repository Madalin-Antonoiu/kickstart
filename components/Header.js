import React from 'react'

import { Menu, Button } from "semantic-ui-react";
import Link from 'next/link';



export default () => {
    return (
        <Menu>
            <Menu.Item>
                CrowdCoin
            </Menu.Item>


            <Menu.Menu position='right'>
                <Menu.Item>
                    <Link href="/campaigns/new">
                        <a>
                            <Button
                                floated="right"
                                content="Create Campaign"
                                icon="add circle"
                                primary
                            />
                        </a>
                    </Link>

                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}