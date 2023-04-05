import React, { useMemo } from 'react'
import { DynamicPages } from '@/store/api/openApi'
import { ExperienceDisplay } from '@/components/ExperienceBuilder'

export async function getStaticPaths() {
  const params = new URLSearchParams({ url: '^[a-z|\-]+$'}).toString() // only get pages with url that starts with a-z or - (root pages)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dynamicpages`)

  const pages: DynamicPages[] = await res.json()

  return {
    paths: pages.map(page => ({ params: { page: page.url }})),
    fallback: false
  }
}

export async function getStaticProps(context: { params: { page: string } }) {
  const params = new URLSearchParams({ url: context.params.page }).toString()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dynamicpages?${params}`)
  const page: DynamicPages[] = await res.json()
  return {
    props: {
      ...page[0]
    }
  }
}

export default function DynamicPage(props: DynamicPages) {
  const experience = useMemo(() => {
    return JSON.parse(props.experience || "{}")
  }, [ props.experience ])

  return <div>
    <ExperienceDisplay
      experience={experience}
    />
  </div>
}