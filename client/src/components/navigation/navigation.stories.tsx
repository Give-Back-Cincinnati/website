import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Navigation } from './navigation'

const story =  {
    title: 'Navigation/Bar',
    component: Navigation,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Navigation>

export default story

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation />

export const Primary = Template.bind({})
