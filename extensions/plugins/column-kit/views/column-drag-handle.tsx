import { memo } from 'react'
import { Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

export const ColumnDragHandle = memo(function ColumnDragHandle() {
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label="column drag">
        <Icon
          className="text-muted cursor-pointer"
          height="24"
          icon="lucide:grip-horizontal"
          width="24"
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
          }}
        />
      </Tooltip.Trigger>
      <Tooltip.Content>Drag to move column</Tooltip.Content>
    </Tooltip>
  )
})
