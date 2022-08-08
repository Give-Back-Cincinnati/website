import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EventHeader } from '.'

const story = {
    title: 'Events/Header',
    component: EventHeader,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof EventHeader>

export default story

const Template: ComponentStory<typeof EventHeader> = (args) => <EventHeader {...args} />

export const Primary = Template.bind({})

export const WithCategory = Template.bind({})
WithCategory.args = {
    title: 'Back to School',
    category: 'Hands On'
}
