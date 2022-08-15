import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import FallFeast from '../../pages/fall-feast'

const story = {
    title: 'Pages/FallFeast',
    component: FallFeast,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof FallFeast>

export default story

const Template: ComponentStory<typeof FallFeast> = () => <FallFeast />

export const Primary = Template.bind({})
