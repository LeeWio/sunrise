'use client'

import { Button, Link } from '@heroui/react'
import React from 'react'

export default function DocsPage() {
  // 分页查询，然后传递给 /blog/[aid]
  // 分页查询多个 article

  return (
    <Button as={Link} href="/blog/ed8d818d-a250-4a8a-9fd5-bcdd80904301">
      /blog/ed8d818d-a250-4a8a-9fd5-bcdd80904301
    </Button>
  )
}
