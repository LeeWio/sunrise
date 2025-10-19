import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type ResultResponse<T = unknown> = {
  code: number
  data?: T
  message: string
}

export type Page<T = unknown> = {
  content: T[]
  total: number
  page: number
  size: number
  totalPages: number
}
