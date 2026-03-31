import React from 'react'
import SidebarFixed from 'components/SidebarFixed'
import { ContentFrame, PageShell } from 'components/common'

export default ({ children, maxWidth = '1180px' }) => {
  return (
    <PageShell>
      <ContentFrame maxWidth={maxWidth}>
        {children}
      </ContentFrame>
      <SidebarFixed />
    </PageShell>
  )
}
