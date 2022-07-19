import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './index'

const story = {
    title: 'Utils/Button',
    component: Button
} as ComponentMeta<typeof Button>

export default story

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Hello World</Button>

export const Primary = Template.bind({})
Primary.args = {
    variant: 'default',
    size: 'md'
}
