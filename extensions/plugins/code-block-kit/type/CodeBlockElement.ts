import { TCodeBlockElement } from 'platejs'

export interface CodeBlockElement extends TCodeBlockElement {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  variant: 'bordered' | 'flat' | 'solid' | 'shadow'
}
