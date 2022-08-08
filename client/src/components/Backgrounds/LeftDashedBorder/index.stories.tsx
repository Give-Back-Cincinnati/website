import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LeftDashedBorder } from '.'
import { BulletList } from '../BulletList'

const story = {
    title: 'Backgrounds/LeftDashedBorder',
    component: LeftDashedBorder,
    parameters: {
        layout: {
            fullscreen: true
        }
    }
} as ComponentMeta<typeof LeftDashedBorder>

export default story

const Template: ComponentStory<typeof LeftDashedBorder> = (args) => <LeftDashedBorder {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: <>
        <h1>What We Do</h1>
        <h4>
            WE AIM FOR COMMUNITY SERVICE WITH A SOCIAL TWIST.
        </h4>
        <p>
            What does that mean? It means members can participate in as many or as few volunteer opportunities as they’d like, and at the end of the day, they celebrate new friendships. In fact, our turnkey events only require one thing – for members to show up! Here’s a snapshot of Give Back Cincinnati’s impact:
        </p>
    </>
}

export const WhatWeDo = Template.bind({})
WhatWeDo.args = {
    children: <>
        <h1>What We Do</h1>
        <div style={{ display: 'flex' }}>
            <div>
                <h4>
                    WE AIM FOR COMMUNITY SERVICE WITH A SOCIAL TWIST.
                </h4>
                <p>
                    What does that mean? It means members can participate in as many or as few volunteer opportunities as they’d like, and at the end of the day, they celebrate new friendships. In fact, our turnkey events only require one thing – for members to show up! Here’s a snapshot of Give Back Cincinnati’s impact:
                </p>
            </div>
            <div>
                <BulletList
                    bullets={[
                        'More than 15,000 hours of service donated to-date',
                        '500+ houses painted throughout the region',
                        'The region\'s largest Thanksgiving meal',
                        'International service in Ghana, Romania, Peru, and beyond'
                    ]}
                        style={{ paddingBottom: '20px' }}
                    />
            </div>

        </div>
    </>
}
