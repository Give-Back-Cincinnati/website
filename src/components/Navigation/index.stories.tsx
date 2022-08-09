import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MockStore } from '../../../.storybook/MockStore'

import { Navigation } from '.'

const story =  {
    title: 'Navigation/TopBar',
    component: Navigation,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Navigation>

export default story

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation />

export const Primary = Template.bind({})

export const Authenticated = Template.bind({})
Authenticated.decorators = [
    (Story) => <MockStore state={{
        user: {isAuthenticated: true}
    }}>
        <Story />
    </MockStore>
]