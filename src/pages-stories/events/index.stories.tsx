import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Events from '../../pages/events'

const story = {
    title: 'Pages/Events/index',
    component: Events,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof Events>

export default story

const Template: ComponentStory<typeof Events> = (args) => <Events />

Template.parameters = {
    nextRouter: {
        path: "/events/[name]",
        asPath: "/events/hello",
        query: {
            name: "hello",
        },
    }
}

export const Primary = Template.bind({})
