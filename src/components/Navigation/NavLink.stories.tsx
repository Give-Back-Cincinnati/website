import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavLink } from './NavLink'

const storyMeta = {
    title: 'Navigation/NavLink',
    component: NavLink,
    args: {
        href: '/about-us',
        label: 'About Us'
    }
} as ComponentMeta<typeof NavLink>

export default storyMeta

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />

export const Primary = Template.bind({})

export const WithChildren = Template.bind({})
WithChildren.args = {
    label: 'About Us',
    href: undefined,
    childRoutes: [
        {
            label: 'Meet the Team',
            href: '/about-us/the-team'
        },
        {
            label: 'Contact Us',
            href: '/about-us/contact-us'
        }
    ]
}