import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DonateModal } from './index'

const storyMeta = {
    title: 'Navigation/Donate',
    component: DonateModal,
    args: {
        isOpen: false
    }
} as ComponentMeta<typeof DonateModal>

export default storyMeta

const Template: ComponentStory<typeof DonateModal> = (args) => <DonateModal {...args} />

export const Primary = Template.bind({})
