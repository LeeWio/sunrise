import { TColumnElement, TColumnGroupElement } from 'platejs'

export interface ColumnGroupElement extends TColumnGroupElement {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size: 'sm' | 'md' | 'lg'
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export interface ColumnElement extends TColumnElement {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size: 'sm' | 'md' | 'lg'
}
