import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NewsletterSignup } from './index'

const story = {
    title: "Inputs/CustomForms/EmailSignup",
    component: NewsletterSignup,
} as ComponentMeta<typeof NewsletterSignup>

export default story

const Template: ComponentStory<typeof NewsletterSignup> = () => <NewsletterSignup />

export const Primary = Template.bind({})