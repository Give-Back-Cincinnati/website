import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../Utils/Button'
import { Table } from './Table'

const story = {
    title: 'DataDisplay/Table',
    component: Table,
    args: {
        keys: ['_id', 'firstName', 'lastName', 'actions'],
        data: [
            {
                _id: '1',
                firstName: 'Clark',
                lastName: 'Kent',
                actions: <Button>Click Me!</Button>
            },
            {
                _id: '2',
                firstName: 'Lex',
                lastName: 'Luther',
                actions: <Button>Click Me!</Button>
            },
            {
                _id: '3',
                firstName: 'Bruce',
                lastName: 'Wayne',
                actions: <Button>Click Me!</Button>
            },
            {
                _id: '4',
                firstName: 'Diana',
                lastName: 'Prince',
                actions: <Button>Click Me!</Button>
            },
    ]
    }
} as ComponentMeta<typeof Table>

export default story

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Primary = Template.bind({})