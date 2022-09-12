import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import FuelHomePage from '../../pages/fuel-cincinnati'

const meta = {
    title: 'Pages/FuelCincinnati/Index',
    component: FuelHomePage,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof FuelHomePage>

export default meta

const Template: ComponentStory<typeof FuelHomePage> = (args) => <FuelHomePage />

export const Primary = Template.bind({})