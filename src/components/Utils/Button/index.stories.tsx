import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './index'

const story = {
    title: 'Utils/Button',
    component: Button,
    args: {
        variant: 'default',
        size: 'md'
    },
    argTypes: {
        onClick: { action: 'clicked' }
    }
} as ComponentMeta<typeof Button>

export default story

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Hello World</Button>

export const Default = Template.bind({})

export const DefaultLoading = Template.bind({})
DefaultLoading.args = {
    isLoading: true
}

export const DefaultDisabled = Template.bind({})
DefaultDisabled.args = {
    disabled: true
}

export const Outlined = Template.bind({})
Outlined.args = {
    variant: 'outlined'
}

export const OutlinedLoading = Template.bind({})
OutlinedLoading.args = {
    variant: 'outlined',
    isLoading: true
}

export const OutlinedDisabled = Template.bind({})
OutlinedDisabled.args = {
    variant: 'outlined',
    disabled: true
}