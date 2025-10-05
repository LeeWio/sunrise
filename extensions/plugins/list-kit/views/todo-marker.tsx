import { PlateElementProps, useReadOnly } from 'platejs/react'
import {
  useTodoListElement,
  useTodoListElementState,
} from '@platejs/list/react'
import { Checkbox } from '@heroui/checkbox'

import { useVariants } from '@/hooks/use-variants'

// TODO: 这里存在 Checkbox 和 内容分开的问题，后期需要通过 v3.heroui.com 的 Checkbox 重新实现,alpha 版本原生支持 checkbox 和编辑区域单独控制
export const TodoMarker: React.FC<PlateElementProps> = props => {
  const variants = useVariants()

  const state = useTodoListElementState({ element: props.element })
  const { checkboxProps } = useTodoListElement(state)
  const readOnly = useReadOnly()

  // 根据 variants.size 动态计算 top 和 left
  const positionClasses = {
    sm: 'top-1 -left-6',
    md: 'top-0.5 -left-7',
    lg: 'top-0 -left-8',
  }

  const positionClass = positionClasses[variants.size] || positionClasses.sm

  return (
    <Checkbox
      className={`absolute ${positionClass}`}
      color={variants.color}
      contentEditable={false}
      isIndeterminate={readOnly}
      isSelected={checkboxProps.checked}
      radius={variants.radius}
      size={variants.size}
      onMouseDown={checkboxProps.onMouseDown}
      onValueChange={checkboxProps.onCheckedChange}
    />
  )
}
