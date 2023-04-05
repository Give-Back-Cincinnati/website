import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreatePage } from './CreatePage'

const story = {
    title: 'Admin/Roles/CreatePage',
    component: CreatePage,
} as ComponentMeta<typeof CreatePage>

export default story

const Template: ComponentStory<typeof CreatePage> = (args) => <CreatePage />

export const Primary = Template.bind({})