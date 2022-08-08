import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { EventCard } from './index'

const story = {
    title: 'Events/Card',
    component: EventCard
} as ComponentMeta<typeof EventCard>

export default story

const Template: ComponentStory<typeof EventCard> = (args) => <EventCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
    date: '2022-08-03T04:00:00.000Z',
    title: 'Don\'t Rock the Boat',
    description: 'An annual favorite! Get in a rowboat and pick up trash in the Winton Woods lake'
}

export const Small = Template.bind({})
Small.args = {
    date: '2022-08-03T04:00:00.000Z',
    title: 'Don\'t Rock the Boat',
    opts: {
        dateHasBorder: true
    }
}