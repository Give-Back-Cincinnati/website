import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextField } from './TextField'

const story = {
    title: 'Inputs/TextField',
    component: TextField,
    argTypes: {
        onChange: { action: 'onChange' }
    }
} as ComponentMeta<typeof TextField>

export default story

const Template: ComponentStory<typeof TextField> = (args) => {
    const [ value, setValue ] = useState(args.value)

    args.onChange = (e) => setValue(e.target.value)
    args.value = value
    return <TextField {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
    name: 'firstName',
    label: 'First Name',
    required: true,
    error: false
}

export const WithValue = Template.bind({})
WithValue.args = {
    ...Primary.args,
    value: 'Clark'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
    ...WithValue.args,
    fullWidth: true
}

export const Errored = Template.bind({})
Errored.args = {
    ...Primary.args,
    value: 'Clark',
    errorText: 'Display information about the error',
    error: true
}

export const WithPattern = Template.bind({})
WithPattern.args = {
    ...Primary.args,
    value: 'not an email',
    pattern: '^.+\@.+\.[a-zA-Z]{2,}$'
}