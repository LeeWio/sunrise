import { Chip, TextField } from '@heroui/react'
import { useFloatingLinkUrlInput, useFloatingLinkUrlInputState } from '@platejs/link/react'

type LinkEditorPanelProps = {
  defaultValue: string
  ref: React.Ref<HTMLInputElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const LinkEditorPanel = (props: LinkEditorPanelProps) => {
  const { defaultValue, ref, onChange } = props

  const usrState = useFloatingLinkUrlInputState()

  const { props: urlProps, ref: urlRef } = useFloatingLinkUrlInput(usrState)

  // TODO: 需要等待 TextField 组件发布
  return (
    <Chip aria-label="Link editor panel" variant="primary">
      <TextField>
        <TextField.Label>adfadf</TextField.Label>
        <TextField.Input />
        <TextField.Description>adfasdf</TextField.Description>
      </TextField>
    </Chip>
  )
}
