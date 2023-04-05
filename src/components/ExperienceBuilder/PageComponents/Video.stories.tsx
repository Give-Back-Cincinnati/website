import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Video from './Video'

const story = {
  title: "ExperienceBuilder/Components/Video",
  component: Video,
  args: {
    url: "#",
    title: "What's YOUR idea?",
    description: "We can help."
  },
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Video>

export default story

const Template: ComponentStory<typeof Video> = (args) => <Video {...args} />

export const Primary = Template.bind({})