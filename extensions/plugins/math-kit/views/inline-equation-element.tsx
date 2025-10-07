import { Popover, PopoverTrigger } from '@heroui/popover'
import { cn } from '@heroui/theme'
import { useEquationElement } from '@platejs/math/react'
import {
  PlateElement,
  PlateElementProps,
  useEditorSelector,
  useSelected,
} from 'platejs/react'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { TEquationElement } from 'platejs'

import { EquationPopoverContent } from './equation-popover-content'

export const InlineEquationElement = (
  props: PlateElementProps<TEquationElement>
) => {
  const element = props.element
  const katexRef = useRef<HTMLDivElement | null>(null)
  const selected = useSelected()
  const isCollapsed = useEditorSelector(editor => editor.api.isCollapsed(), [])
  const [open, setOpen] = useState(selected && isCollapsed)

  useEffect(() => {
    if (selected && isCollapsed) {
      setOpen(true)
    }
  }, [selected, isCollapsed])

  useEquationElement({
    element,
    katexRef: katexRef,
    options: {
      displayMode: true,
      errorColor: '#cc0000',
      fleqn: false,
      leqno: false,
      macros: { '\\f': '#1f(#2)' },
      output: 'htmlAndMathml',
      strict: 'warn',
      throwOnError: false,
      trust: false,
    },
  })

  return (
    <PlateElement
      {...props}
      className={cn(
        'mx-1 inline-block rounded-sm select-none [&_.katex-display]:my-0!'
      )}
    >
      <Popover isOpen={open} onOpenChange={open => setOpen(open)}>
        <PopoverTrigger>
          <div
            className={cn(
              'after:absolute cursor-pointer after:inset-0 after:-top-0.5 after:-left-1 after:z-1 after:h-[calc(100%)+4px] after:w-[calc(100%+8px)] after:rounded-sm after:content-[""]',
              'h-6',
              ((element.texExpression.length > 0 && open) || selected) &&
                'after:bg-brand/15',
              element.texExpression.length === 0 &&
                'text-muted-foreground after:bg-neutral-500/10'
            )}
            contentEditable={false}
          >
            <span
              ref={katexRef}
              className={cn(
                element.texExpression.length === 0 && 'hidden',
                'font-mono leading-none'
              )}
            />
            {element.texExpression.length === 0 && (
              <span>
                <Icon
                  className="mr-1 inline-block h-[19px] w-4 py-[1.5px] align-text-bottom"
                  icon="lucide:radical"
                />
                New equation
              </span>
            )}
          </div>
        </PopoverTrigger>

        <EquationPopoverContent
          isInline
          open={open}
          placeholder="E = mc^2"
          setOpen={setOpen}
        />
      </Popover>
      {props.children}
    </PlateElement>
  )
}
