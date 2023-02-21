import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DateTime } from 'luxon'

import { DateTimePicker } from './DateTimePicker'

const story = {
    title: 'Inputs/DateTimePicker',
    component: DateTimePicker,
    argTypes: {
        onChange: { action: 'onChange' }
    }
} as ComponentMeta<typeof DateTimePicker>

export default story

const Template: ComponentStory<typeof DateTimePicker> = (args) => <DateTimePicker {...args} />

export const Primary = Template.bind({})
Primary.args = {
    name: 'startTime',
    label: 'Start Time',
    value: DateTime.now(),
    required: true,
    error: false
}

export const FullWidth = Template.bind({})
FullWidth.args = {
    ...Primary.args,
    fullWidth: true
}

export const Errored = Template.bind({})
Errored.args = {
    ...Primary.args,
    errorText: 'Display information about the error',
    error: true
}
