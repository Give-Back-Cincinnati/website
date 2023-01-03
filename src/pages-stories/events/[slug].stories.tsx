import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import type { Events } from '../../store/api/openApi'

import Event from '../../pages/events/[slug]'

const story = {
    title: 'Pages/Events/[slug]',
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
    },
    args: {
        event: {
            _id: '',
            name: 'Don\'t Rock the Boat',
            description: 'Need a longer description...',
            category: 'Hands-On',
            address: 'Gorman Heritage Farms',
            startTime: '2022-08-24T13:00:00.000+00:00',
            endTime: '2022-08-24T17:00:00.000+00:00',
            slug: 'dont-rock-the-boat'
        } as Events
    }
} as ComponentMeta<typeof Event>

export default story

const Template: ComponentStory<typeof Event> = (args) => <Event {...args} />

export const Primary = Template.bind({})
