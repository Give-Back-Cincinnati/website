import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DynamicForm, DynamicFormProps} from './DynamicForm'

const story = {
    title: 'Inputs/DynamicForm',
    component: DynamicForm,
    args: {
        entity: {"type":"object","required":["name","description","category","address","startTime","endTime"],"properties":{"_id":{"type":"string","readonly":true},"name":{"type":"string","example":"Back to School"},"description":{"type":"string","example":"This is a longer description of an event..."},"category":{"type":"string","enum":["Hands-On","Social","Interactive","Civic Engagement","New Member","Cincy YP","Leadership","Fall Feast","Paint the Town","Give Back Beyond Cincinnati"],"example":"Hands-On"},"address":{"type":"string","example":"312 Walnut St. Cincinnati OH 45202"},"startTime":{"type":"string","format":"date-time"},"endTime":{"type":"string","format":"date-time"}, 'subscribe': {"type": 'boolean'} }}
    },
    argTypes: {
        submit: { action: 'submit' }
    }
} as ComponentMeta<typeof DynamicForm>

export default story

const Template: ComponentStory<typeof DynamicForm> = (args) => <DynamicForm {...args} />

export const Primary = Template.bind({})

export const AltForm = Template.bind({})
AltForm.args = {
    entity: {"type":"object","required":["name", "address","startTime","endTime"],"properties":{"_id":{"type":"string","readonly":true},"name": {"type": 'boolean'},"description": {"type": 'boolean'},"category":{"type":"string","enum":["Hands-On","Social","Interactive","Civic Engagement","New Member","Cincy YP","Leadership","Fall Feast","Paint the Town","Give Back Beyond Cincinnati"],"example":"Hands-On"},"address":{"type":"string","example":"312 Walnut St. Cincinnati OH 45202"},"startTime":{"type":"string","format":"date-time"},"endTime":{"type":"string","format":"date-time"}, 'subscribe': {"type": 'boolean'} }}
}