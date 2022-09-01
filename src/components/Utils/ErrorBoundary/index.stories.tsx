import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ErrorBoundary } from './index'

import ErrorPage from '../../../pages/events/[name]'

const story = {
    title: 'Utils/ErrorBoundary',
    component: ErrorBoundary,
} as ComponentMeta<typeof ErrorBoundary>

export default story

const Template: ComponentStory<typeof ErrorBoundary> = (args) => <ErrorBoundary {...args}>
    <div>
        Error Boundary...
    </div>
</ErrorBoundary>

const ErroredTemplate: ComponentStory<typeof ErrorBoundary> = (args) => <ErrorBoundary {...args}>
<ErrorPage />
</ErrorBoundary>


export const Primary = Template.bind({})

export const Errored = ErroredTemplate.bind({})

export const ErroredWithMessage: ComponentStory<typeof ErrorBoundary> = (args) => <ErrorBoundary {...args}>
    <ErrorPage />
</ErrorBoundary>
ErroredWithMessage.args = {
    message: 'Failed to load resource'
}