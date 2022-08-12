import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Spinner } from './Spinner'

const story = {
    title: 'DataDisplay/Spinner',
    component: Spinner,
} as ComponentMeta<typeof Spinner>

export default story

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

export const Primary = Template.bind({})
Primary.args = {
    color: 'information'
}
