import { TCodeSyntaxLeaf } from 'platejs'
import { PlateLeaf, PlateLeafProps } from 'platejs/react'

export const CodeSyntaxLeaf = (props: PlateLeafProps<TCodeSyntaxLeaf>) => {
  const tokenClassName = props.leaf.className as string

  return <PlateLeaf className={tokenClassName} {...props} />
}
