import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Paper } from './index'

const storyMeta = {
    title: 'Utils/Paper',
    component: Paper,
    parameters: {
        backgrounds: {
            default: 'gray',
            values: [
                { name: 'white', value: '#FFF'},
                { name: 'gray', value: 'rgba(0, 0, 0, .75)' }
            ]
        }
    }
} as ComponentMeta<typeof Paper>

export default storyMeta

const Template: ComponentStory<typeof Paper> = (args) => <Paper {...args}>
    <div>
        <h4>Hello World</h4>
        <p>This is text</p>
    </div>
</Paper>

export const Primary = Template.bind({})

export const WithElevation = Template.bind({})
WithElevation.args = {
    elevation: 6
}
