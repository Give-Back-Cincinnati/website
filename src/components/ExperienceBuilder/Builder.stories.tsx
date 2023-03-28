import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ExperienceBuilder } from './Builder'

const meta: ComponentMeta<typeof ExperienceBuilder> = {
  title: 'ExperienceBuilder/Builder',
  component: ExperienceBuilder,
  parameters: {
    layout: 'fullscreen',
  }
}

export default meta

const Template: ComponentStory<typeof ExperienceBuilder> = (args) => <ExperienceBuilder {...args} />

export const Primary = Template.bind({})

export const WithComponents = Template.bind({})
WithComponents.args = {
  initialExperience: [
    {
      component: 'Header',
      props: {
        title: 'Hello World'
      }
    },
    { component: 'HorizontalBreak', props: {} },
    { component: 'FAQ', props: { items: [{ question: 'What do I need to bring to Paint Day?', answer: 'A good attitude!' }] } },
  ]
}