import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import { memo } from 'react'

export const ColumnDragHandle = memo(function ColumnDragHandle() {
  return (
    <Tooltip closeDelay={0} content="Drag to move column" delay={0}>
      <Button isIconOnly size="sm" variant="light">
        <Icon
          className="text-default-500"
          height="24"
          icon="lucide:grip-horizontal"
          width="24"
          onClick={event => {
            event.stopPropagation()
            event.preventDefault()
          }}
        />
      </Button>
    </Tooltip>
  )
})
