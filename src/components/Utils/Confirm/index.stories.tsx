import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Confirm } from './index'

const story = {
    title: 'Utils/Confirm',
    component: Confirm,
    parameters: {
        layout: 'fullscreen'
    },
    args: {
        action: 'Delete',
        entityName: 'Don\'t Rock the Boat'
    },
    argTypes: {
        onConfirm: { action: 'onConfirm' }
    }
} as ComponentMeta<typeof Confirm>

export default story

const Template: ComponentStory<typeof Confirm> = (args) => <Confirm {...args} />

export const Primary = Template.bind({})

export const ShortName = Template.bind({})
ShortName.args = {
    entityName: 'Short'
}