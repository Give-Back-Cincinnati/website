import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Alert } from './index'

const story = {
    title: 'Utils/Alert',
    component: Alert,
    parameters: {
        layout: 'fullscreen'
    },
    // decorators: [
    //     (Story) => <div style={{ margin: '2rem' }}>
    //         <Story />
    //     </div>
    // ]
} as ComponentMeta<typeof Alert>

export default story

const Template: ComponentStory<typeof Alert> = (args) =>  <Alert { ...args } />

export const Primary = Template.bind({})
Primary.args = {
    title: "Hello World!",
    body: "This is a body for hello world toaster strudel"
}
