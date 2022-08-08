import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Events from '../pages/events'

const story = {
    title: 'Pages/events',
    component: Events,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Events>

export default story

const Template: ComponentStory<typeof Events> = (args) => <Events />

export const Primary = Template.bind({})