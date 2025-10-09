import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Icon } from '@iconify/react'
import { KEYS } from 'platejs'
import { useEditorRef } from 'platejs/react'

export const MoreToolbarButton = () => {
  const editor = useEditorRef()

  return <>
    <Popover>
      <PopoverTrigger>
        <Button size='sm' variant='light' isIconOnly>
          <Icon icon="fa6-solid:ellipsis-vertical" fontSize={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-row gap-0.5'>

        <Button isIconOnly size='sm' variant='light' onPress={() => {
          editor.tf.toggleMark(KEYS.kbd)
          editor.tf.collapse({ edge: 'end' })
          editor.tf.focus()
        }}>
          <Icon icon="lucide:keyboard" fontSize={14} />
        </Button>

        <Button isIconOnly size='sm' variant='light' onPress={() => {
          editor.tf.toggleMark(KEYS.sup, {
            remove: KEYS.sub
          })
          editor.tf.focus()
        }}>
          <Icon icon="lucide:superscript" fontSize={14} />
        </Button>

        <Button isIconOnly size='sm' variant='light' onPress={() => {
          editor.tf.toggleMark(KEYS.sub, {
            remove: KEYS.sup
          })
          editor.tf.focus()
        }}>
          <Icon icon="lucide:subscript" fontSize={14} />
        </Button>


      </PopoverContent>
    </Popover>
  </>

}
