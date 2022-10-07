import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { EventCard } from './index'

const story = {
    title: 'Events/Card',
    component: EventCard,
    args: {
        startTime: '2022-08-03T04:00:00.000Z',
        name: 'Don\'t Rock the Boat',
        description: 'An annual favorite! Get in a rowboat and pick up trash in the Winton Woods lake'
    }
} as ComponentMeta<typeof EventCard>

export default story

const Template: ComponentStory<typeof EventCard> = (args) => <EventCard {...args} />

export const Primary = Template.bind({})

export const Small = Template.bind({})
Small.args = {
    opts: {
        dateHasBorder: true
    }
}