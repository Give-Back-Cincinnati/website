import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DateTime } from 'luxon'

import { Button } from '../Utils/Button'
import { Table } from './Table'

const story = {
    title: 'DataDisplay/Table',
    component: Table,
    args: {
        keys: [ '_id', 'firstName', 'lastName', 'timestamp', 'actions' ],
        data: [
            {
                _id: '1',
                firstName: 'Clark',
                lastName: 'Kent',
                actions: <Button>Click Me!</Button>,
                timestamp: '2020-08-09T04:05:04.296+00:00'
            },
            {
                _id: '2',
                firstName: 'Lex',
                lastName: 'Luther',
                actions: <Button>Click Me!</Button>,
                timestamp: '2021-08-09T04:05:04.296+00:00'
            },
            {
                _id: '3',
                firstName: 'Bruce',
                lastName: 'Wayne',
                actions: <Button>Click Me!</Button>,
                timestamp: '2019-08-09T04:05:04.296+00:00'
            },
            {
                _id: '4',
                firstName: 'Diana',
                lastName: 'Prince',
                actions: <Button>Click Me!</Button>,
                timestamp: '2022-08-09T04:05:04.296+00:00'
            },
    ]
    }
} as ComponentMeta<typeof Table>

export default story

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Primary = Template.bind({})

export const WithFormatFunction = Template.bind({})
WithFormatFunction.args = {
    formatFunctions: {
        timestamp: (val) => DateTime.fromISO(val).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
    }
}
