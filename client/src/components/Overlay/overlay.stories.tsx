import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Overlay } from './index'

const story = {
    title: 'Utils/Overlay',
    component: Overlay,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Overlay>

export default story

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args}>
    <div style={{
        width: '60%',
        height: '100%',
        background: 'white',
        position: 'fixed',
        right: 0
    }}>This is a Child component</div>
</Overlay>

export const Primary = Template.bind({})
Primary.args = { 
    isOpen: false
}
