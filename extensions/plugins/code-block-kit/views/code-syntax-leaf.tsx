import { PlateLeaf, PlateLeafProps } from 'platejs/react'

export const CodeSyntaxLeaf = (props: PlateLeafProps) => {
  const tokenClassName = props.leaf.className as string

  return <PlateLeaf {...props} className={tokenClassName} />
}
