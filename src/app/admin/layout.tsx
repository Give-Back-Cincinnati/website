'use client'
import React, { useCallback } from 'react'
import { AppLayout, SideNavigation, SideNavigationProps } from '@cloudscape-design/components'
import "@cloudscape-design/global-styles/index.css"
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();

  return <AppLayout
    headerSelector='#h'
    content={children}
    navigation={<SideNavigation
      activeHref={pathname || undefined}
      header={{ text: 'Administration Pages', href: '/admin' }}
      items={[
        { type: 'link', href: '/admin/events', text: 'Events' },
        { type: 'link', href: '/admin/users', text: 'Users' },
        { type: 'link', href: '/admin/dynamic-pages', text: 'Dynamic Pages' },
      ]}
      onFollow={(e) => {
        e.preventDefault();
        router.push(e.detail.href)
      }}
    />}
    toolsHide
  />
}