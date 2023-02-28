import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Highlights } from './Highlights'

const story = {
  title: "ExperienceBuilder/Components/Highlights",
  component: Highlights,
  args: {
    title: 'Who We Are',
    description: 'We are Young Professionals. We are Volunteers. We are Passionate. We are Connected. We are Fuel Cincinnati.',
    highlights: [
      {
        title: '83',
        tag: 'Ideas funded',
        description: 'Fuel Cincinnati provides the initial dollars to get your idea off the ground and running. We typically provide from $500 to $2500 in funding to jump start your idea.'
      },
      {
        title: "$103,286",
        tag: 'Money awarded',
        description: "We don't just provide dollars. We also provide connections to volunteers and community leaders, as well as logistical support to help you make your idea a reality. We are a group of diverse young professional volunteers with networks and connections all over Cincinnati and Northern Kentucky."
      },
      {
        title: "100%",
        tag: 'Volunteers',
        description: "Being a part of Give Back Cincinnati, we believe in investing in today's communities and tomorrow's leaders. We take that very seriously, and want to invest not only in your idea, but in you as an individual, so you can develop into a leader for your community."
      },
    ]
  },
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Highlights>

export default story

const Template: ComponentStory<typeof Highlights> = (args) => <Highlights {...args} />

export const Primary = Template.bind({})
