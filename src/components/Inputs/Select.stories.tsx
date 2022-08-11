import React from 'react'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Select } from './Select'

const story = {
    title: 'Inputs/Select',
    component: Select,
    args: {
        label: "Who is Superman?",
        value: '',
        options: [{ _id: "1", label: "Clark Kent"}, { _id: "2", label: "Lex Luthor" }],
        nullable: false,
        required: true
    }
} as ComponentMeta<typeof Select>

export default story

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})

export const OnlyId = Template.bind({})
OnlyId.args = {
    options: [{ _id: "1"}, { _id: "2"}],
}

export const FullWidth = Template.bind({})
FullWidth.args = {
    fullWidth: true
}

export const Nullable = Template.bind({})
Nullable.args = {
    nullable: true
}

export const Errored = Template.bind({})
Errored.args = {
    error: true,
    errorText: 'No, he works at the daily planet'
}