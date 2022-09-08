import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreateRole } from './CreateRole'

const story = {
    title: 'Admin/Roles/CreateRole',
    component: CreateRole,
} as ComponentMeta<typeof CreateRole>

export default story

const Template: ComponentStory<typeof CreateRole> = (args) => <CreateRole />

export const Primary = Template.bind({})