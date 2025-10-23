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
  // Backend Spring Data pagination fields
  totalElements?: number
  numberOfElements?: number
  last?: boolean
  first?: boolean
  numberOfElements?: number
}
