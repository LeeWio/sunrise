import { Popover, PopoverTrigger, cn } from '@heroui/react'
import { useEquationElement } from '@platejs/math/react'
import { TEquationElement } from 'platejs'
import {
  PlateElement,
  PlateElementProps,
  useEditorSelector,
  useSelected,
} from 'platejs/react'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

import { EquationPopoverContent } from './equation-popover-content'

export const EquationElement = (props: PlateElementProps<TEquationElement>) => {
  const selected = useSelected()
  const isCollapsed = useEditorSelector(editor => editor.api.isCollapsed(), [])
  const [open, setOpen] = useState(selected && isCollapsed)
  const katexRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selected && isCollapsed) {
      setOpen(true)
    }
  }, [selected, isCollapsed])

  useEquationElement({
    element: props.element,
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
    <PlateElement {...props}>
      <Popover>
        <PopoverTrigger>
          <div
            className={cn(
              'group flex cursor-pointer items-center justify-center rounded-sm select-none hover:bg-primary/10 data-[selected=true]:bg-primary/10',
              props.element.texExpression.length === 0
                ? 'bg-muted p-3 pr-9'
                : 'px-2 py-1'
            )}
            contentEditable={false}
            data-selected={selected}
            role="button"
          >
            {props.element.texExpression.length > 0 ? (
              <span ref={katexRef} />
            ) : (
              <div className="flex h-7 w-full items-center gap-2 text-sm whitespace-nowrap text-muted-foreground">
                <Icon className="size-6" icon="lucide:radical " />
                <div>Add a Tex equation</div>
              </div>
            )}
          </div>
        </PopoverTrigger>
        <EquationPopoverContent
          isInline={false}
          open={open}
          placeholder={`f(x) = \\begin{cases}\n  x^2, &\\quad x > 0 \\\\\n  0, &\\quad x = 0 \\\\\n  -x^2, &\\quad x < 0\n\\end{cases}`}
          setOpen={setOpen}
        />
      </Popover>
    </PlateElement>
  )
}
