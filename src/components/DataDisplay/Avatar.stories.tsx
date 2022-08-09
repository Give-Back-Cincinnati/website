import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Avatar, AvatarProps } from './Avatar'

const story = {
    title: 'DataDisplay/Avatar',
    component: Avatar,
    args: {
        name: "Clark Kent"
    }
} as ComponentMeta<typeof Avatar>

export default story

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    src: '/examples/avatar.png'
}

export const Initials = Template.bind({})
