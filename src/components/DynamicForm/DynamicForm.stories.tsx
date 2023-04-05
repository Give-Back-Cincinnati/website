import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DynamicForm, DynamicFormProps} from './'

const story = {
    title: 'Inputs/DynamicForm',
    component: DynamicForm,
    args: {
        entity: {
            "type":"object",
            "required":["name","description","category","address","startDate","endTime"],
            "properties":{
                "_id":{"type":"string","readonly":true},
                "name":{"type":"string","example":"Back to School"},
                "description":{"type":"string","example":"This is a longer description of an event...", 'maxLength': 1000},
                "category":{"type":"string","enum":["Hands-On","Social","Interactive","Civic Engagement","New Member","Cincy YP","Leadership","Fall Feast","Paint the Town","Give Back Beyond Cincinnati"],
                "example":"Hands-On"},
                "address":{"type":"string","example":"312 Walnut St. Cincinnati OH 45202"},
                "startDate":{"type":"string","format":"date"},
                "endTime":{"type":"string","format":"date-time"},
                'subscribe': {"type": 'boolean'} 
            }
        }
    },
    argTypes: {
        onSubmit: { action: 'onSubmit' }
    }
} as ComponentMeta<typeof DynamicForm>

export default story

const Template: ComponentStory<typeof DynamicForm> = (args) => <DynamicForm {...args} />

export const Primary = Template.bind({})

export const AltForm = Template.bind({})
AltForm.args = {
    entity: {"type":"object","required":["name", "address","startTime","endTime"],"properties":{"_id":{"type":"string","readonly":true},"name": {"type": 'boolean'},"description": {"type": 'boolean'},"category":{"type":"string","enum":["Hands-On","Social","Interactive","Civic Engagement","New Member","Cincy YP","Leadership","Fall Feast","Paint the Town","Give Back Beyond Cincinnati"],"example":"Hands-On"},"address":{"type":"string","example":"312 Walnut St. Cincinnati OH 45202"},"startTime":{"type":"string","format":"date-time"},"endTime":{"type":"string","format":"date-time"}, 'subscribe': {"type": 'boolean'} }}
}

export const ArrayForm = Template.bind({})
ArrayForm.args = {
    entity: {
        "type":"object",
        "required":["name","description","category","address","startDate","endTime"],
        "properties":{
            "_id":{"type":"boolean"},
            "name":{"type":"string","example":"Back to School"},
            "FAQs": {
                "type": "array",
                "items": {
                    "type":"object",
                    "required":["question","answer"],
                    "properties":{
                        "question":{"type":"string","example":"What is the event about?"},
                        "answer":{"type":"string","example":"This is a longer description of an event..."},
                    }
                }
            }
        }
    },
    values: {
        "FAQs": [{ question: 'What is the event about?', answer: 'This is a longer description of an event...' }]
    }
}

export const Editing = Template.bind({})
Editing.args = {
    values: {
        "_id": "6310e4788a44ff826bd871e7",
        "name": "Don't Rock the Boat",
        "description": "Our annual pilgrimage to Winton Woods to help clean up the lake!",
        "category": "Hands-On",
        "address": "Winton Woods",
        "location": {
            "coordinates": []
        },
        "startTime": "2022-09-01T17:00:00.000+00:00",
        "endTime": "2022-09-01T21:00:00.000+00:00",
        "__v": 0
    }
}

export const HiddenFields = Template.bind({})
HiddenFields.args = {
    hiddenFields: ['description', 'category', 'startTime', 'endTime']
}

export const WithTurnstile = Template.bind({})
WithTurnstile.args = {
    isProtected: true
}

export const WithLabelOverride = Template.bind({})
WithLabelOverride.args = {
    labelOverrides: {
        'subscribe': (str) => {
            return <>This is an <a href="#">override</a></>
        }
    }
}

export const HideSubmit = Template.bind({})
HideSubmit.args = {
    hideSubmit: true
}