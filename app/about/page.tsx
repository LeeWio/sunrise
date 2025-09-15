'use client'
import { Popover } from '@heroui/react'

export default function AboutPage() {
  return (
    <Popover>
      <Popover.Trigger>
        <input />
      </Popover.Trigger>
      <Popover.Content>Content</Popover.Content>
    </Popover>
  )
}
