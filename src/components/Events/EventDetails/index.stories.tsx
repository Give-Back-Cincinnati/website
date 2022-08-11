import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { EventDetails } from './index'

const story = {
    title: 'Events/Details',
    component: EventDetails,
} as ComponentMeta<typeof EventDetails>

export default story

const Template: ComponentStory<typeof EventDetails> = (args) => <EventDetails />

export const Primary = Template.bind({})
