import { EquationPlugin, InlineEquationPlugin } from '@platejs/math/react'

import { EquationElement } from './views/equation-element'
import { InlineEquationElement } from './views/inline-equation-element'

export const MathKit = [
  EquationPlugin.withComponent(EquationElement),
  InlineEquationPlugin.withComponent(InlineEquationElement),
]
