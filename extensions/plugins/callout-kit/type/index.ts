import { TElement } from 'platejs'

export interface CalloutElement extends TElement {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  variant: 'solid' | 'bordered' | 'flat' | 'faded'
}
