"use client"
import React, { Suspense } from 'react'
import { Spinner } from '@cloudscape-design/components'
import { Events, useSearchRegistrationsQuery } from '@/store/api/openApi'

export default function NumRegistrants (props: { events: Events[] }) {
  const { data, error, isLoading } = useSearchRegistrationsQuery({})

  return <Suspense fallback={<Spinner />}>
    <h3>Total Registrations: {data && data.reduce((acc, event) => acc + event.numRegistrations, 0)}</h3>
  </Suspense>
}