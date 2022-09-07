import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NewRole } from './NewRole'

const story = {
    title: 'Admin/Users/NewRole',
    component: NewRole,
    args: {
        currentRole: ''
    }
} as ComponentMeta<typeof NewRole>

export default story

const Template: ComponentStory<typeof NewRole> = (args) => <NewRole {...args} />

export const Primary = Template.bind({})