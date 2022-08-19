import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Modal } from './index'

const story = {
    title: 'Utils/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Modal>

export default story

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args}>
    <div>
        This is a child element...
    </div>
</Modal>

export const Open = Template.bind({})
Open.args = {
    isOpen: true
}
