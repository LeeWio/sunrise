import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type ResultResponse<T = unknown> = {
  status: number
  data?: T
  message: string
}
