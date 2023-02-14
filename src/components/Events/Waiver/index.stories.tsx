import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AgreedToTerms from './index'

const story = {
    title: 'Events/Waiver',
    component: AgreedToTerms,
} as ComponentMeta<typeof AgreedToTerms>

export default story

const Template: ComponentStory<typeof AgreedToTerms> = () => <AgreedToTerms />

export const Primary = Template.bind({})