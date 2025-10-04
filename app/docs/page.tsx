'use client'

import { Code } from '@heroui/code'

import { useVariants } from '@/hooks/use-variants'

export default function DocsPage() {
  const variants = useVariants()

  return (
    <div>
      <div>{variants.color}</div>
      <Code color={variants.color}>this is a demo</Code>
    </div>
  )
}
