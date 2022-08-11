import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HorizontalBreak } from './index'

const story = {
    title: 'Backgrounds/HorizontalBreak',
    component: HorizontalBreak,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof HorizontalBreak>

export default story

const Template: ComponentStory<typeof HorizontalBreak> = (args) => <HorizontalBreak {...args}>Hello World</HorizontalBreak>

export const Primary = Template.bind({})
