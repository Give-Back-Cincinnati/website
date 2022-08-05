import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Footer } from '.'

const story = {
    title: 'Navigation/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof Footer>

export default story

const Template: ComponentStory<typeof Footer> = (args) => <Footer />

export const Primary = Template.bind({})
