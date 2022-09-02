import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Events from '../../pages/events'

const story = {
    title: 'Pages/Events/index',
    component: Events,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        events: [{"location":{"coordinates":[]},"_id":"63068988aa163b48c950dcef","name":"xx","description":"yy","category":"Hands-On","address":"asd","startTime":"2022-08-24T20:26:00.000Z","endTime":"2022-08-24T20:26:00.000Z","createdAt":"2022-08-24T20:26:48.108Z","updatedAt":"2022-08-24T20:26:48.108Z","__v":0},{"location":{"coordinates":[]},"_id":"63079a0fc395489f9ab05f3c","name":"yy","description":"yy","category":"Social","address":"asdf","startTime":"2022-08-25T15:49:00.000Z","endTime":"2022-08-25T15:49:00.000Z","createdAt":"2022-08-25T15:49:35.977Z","updatedAt":"2022-08-25T15:49:35.977Z","__v":0},{"location":{"coordinates":[]},"_id":"6310e4788a44ff826bd871e7","name":"Don't Rock the Boat","description":"Our annual pilgrimage to Winton Woods to help clean up the lake!","category":"Hands-On","address":"Winton Woods","startTime":"2022-09-01T17:00:00.000Z","endTime":"2022-09-01T19:00:00.000Z","createdAt":"2022-09-01T16:57:28.801Z","updatedAt":"2022-09-01T16:57:28.801Z","__v":0}]
    }
} as ComponentMeta<typeof Events>

export default story

const Template: ComponentStory<typeof Events> = (args) => <Events {...args} />

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

export const NoEvents = Template.bind({})
NoEvents.args = { events: [] }