import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BulletList } from '.'

const story = {
    title: 'Utils/BulletList',
    component: BulletList,
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    }
} as ComponentMeta<typeof BulletList>

export default story

const Template: ComponentStory<typeof BulletList> = (args) => <BulletList {...args} />

export const Primary = Template.bind({})
Primary.args = {
    bullets: ['This is a list item', 'so is this']
}
