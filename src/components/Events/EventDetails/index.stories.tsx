import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { EventDetails } from './index'

const story = {
    title: 'Events/Details',
    component: EventDetails,
    args: {
        startTime: '2022-08-24T13:00:00.000+00:00',
        endTime: '2022-08-24T17:00:00.000+00:00',
        address: 'The Globe Covington, 12 E 5th Street, Covington, KY 41011'
    }
} as ComponentMeta<typeof EventDetails>

export default story

const Template: ComponentStory<typeof EventDetails> = (args) => <EventDetails {...args} />

export const Primary = Template.bind({})
