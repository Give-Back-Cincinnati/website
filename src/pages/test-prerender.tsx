import React from 'react'

export function getServerSideProps () {
  return {
    props: {
      message: 'Hello World'
    }
  }
}

export default function TestPrerender ({ message }: { message: string }) {
  return <div>{message}</div>
}