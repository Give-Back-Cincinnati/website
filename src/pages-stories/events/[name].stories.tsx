import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Event from '../../pages/events/[name]'

const story = {
    title: 'Pages/Events/[name]',
    component: Event,
    parameters: {
        layout: 'fullscreen',
        nextRouter: {
            path: "/events/[name]",
            asPath: "/events/hello",
            query: {
                name: "Back To School",
            },
        }
    }
} as ComponentMeta<typeof Event>

export default story

const Template: ComponentStory<typeof Event> = (args) => <Event />

export const Primary = Template.bind({})
