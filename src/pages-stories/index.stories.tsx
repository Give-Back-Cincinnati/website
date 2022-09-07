import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Index from '../pages/index'

const story = {
    title: 'Pages/index',
    component: Index,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        events: []
    }
} as ComponentMeta<typeof Index>

export default story

const Template: ComponentStory<typeof Index> = (args) => <Index {...args} />

export const Primary = Template.bind({})
