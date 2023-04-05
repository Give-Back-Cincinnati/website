import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TermsOfUse from '../pages/terms-of-use'

const story = {
    title: 'Pages/TermsOfUse',
    component: TermsOfUse,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof TermsOfUse>

export default story

const Template: ComponentStory<typeof TermsOfUse> = () => <TermsOfUse />

export const Primary = Template.bind({})