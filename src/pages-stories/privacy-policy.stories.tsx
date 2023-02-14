import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import PrivacyPolicy from '../pages/privacy-policy'

const story = {
    title: 'Pages/PrivacyPolicy',
    component: PrivacyPolicy,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof PrivacyPolicy>

export default story

const Template: ComponentStory<typeof PrivacyPolicy> = () => <PrivacyPolicy />

export const Primary = Template.bind({})