import React from 'react'
import { Events } from "@/store/api/openApi"
import NumRegistrants from './numRegistrants'

export default async function Admin () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events?sort=startTime&order=asc&startTime%5B%24gt%5D=2023`, { cache: 'force-cache' })
  const events: Events[] = await res.json()

  return <div>
    <h1>Admin</h1>

    <h2>Events this year: {events.length}</h2>
    <NumRegistrants events={events} />
  </div>
}