import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CheckBox } from './CheckBox'

const story = {
    title: 'Inputs/CheckBox',
    component: CheckBox,
    args: {
        name: 'isSuperman',
        label: 'I am Superman',
        checked: false
    }
} as ComponentMeta<typeof CheckBox>

export default story

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />

export const Primary = Template.bind({})

export const Checked = Template.bind({})
Checked.args = {
    checked: true
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}