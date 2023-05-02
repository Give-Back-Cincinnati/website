import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AddCustomField } from './AddCustomField'

const meta: ComponentMeta<typeof AddCustomField> = {
    title: 'Admin/Events/AddCustomFields',
    component: AddCustomField,
    args: {
        eventId: '1234'
    }
}

export default meta

const Template: ComponentStory<typeof AddCustomField> = (args) => <AddCustomField {...args} />

export const Primary = Template.bind({})