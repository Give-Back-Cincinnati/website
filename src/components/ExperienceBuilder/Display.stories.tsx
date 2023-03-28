import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ExperienceDisplay } from './Display'

const story = {
  title: "ExperienceBuilder/Display",
  component: ExperienceDisplay,
  args: {
    experience: [
      {
        component: "Header",
        props: {
          title: 'Hello World',
        }
      },
      {
        component: "Highlights",
        props: {
          title: "These are highlights",
          description: "this is a description of the highlights that go in this section",
          highlights: [
            {
              title: "hello",
              tag: "tag",
              description: "This is a description"
            },
            {
              title: "hello",
              tag: "tag",
              description: "This is a description"
            }
          ]
        }
      },
      {
        component: 'BulletList',
        props: {
          bullets: [
            "hello",
            "world"
          ]
        }
      },
      {
        component: 'HorizontalBreak',
        props: {
          children: 'Hello World'
        }
      },
      {
        component: "Descriptors",
        props: {
          title: "Descriptor...",
          description: "This is a descriptor for the description",
          highlights: [
            {
              title: "99+!",
              description: "How awesome we are out of 100"
            }
          ]
        }
      },
      {
        component: "FAQ",
        props: {
          items: [
            {
              question: 'Do you like olives?',
              answer: "So MUCH!"
            },
            {
              question: 'Do you like pickles?',
              answer: "NO, they're disgusting"
            },
            {
              question: 'Do you like days off?',
              answer: "They are absolutely the best thing ever"
            },
          ]
        }
      },
    ]
  },
  parameters: {
    layout: 'fullscreen',
  }
} as ComponentMeta<typeof ExperienceDisplay>

export default story

const Template: ComponentStory<typeof ExperienceDisplay> = (args) => <ExperienceDisplay {...args} />

export const Primary = Template.bind({})