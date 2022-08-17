import { DateTime } from "luxon"

export interface IEvent {
    _id?: string
    name: string
    description: string
    category: string
    address: string
    startTime: string | DateTime
    endTime: string | DateTime
}