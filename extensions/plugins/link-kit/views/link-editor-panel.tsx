import {
  useFloatingLinkUrlInput,
  useFloatingLinkUrlInputState,
} from '@platejs/link/react'
import { Input } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useFormInputProps } from 'platejs/react'

type LinkEditorPanelProps = {
  defaultValue: string
  ref: React.Ref<HTMLInputElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const LinkEditorPanel = (props: LinkEditorPanelProps) => {
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  })

  const urlState = useFloatingLinkUrlInputState()

  const { props: urlProps, ref: urlRef } = useFloatingLinkUrlInput(urlState)

  return (
    <div
      {...inputProps}
      aria-label="Link editor panel"
      className="z-10 px-2.5 py-1 w-full items-center justify-center subpixel-antialiased outline-solid outline-transparent box-border text-small bg-content1 rounded-medium shadow-small flex flex-col gap-1.5"
    >
      <Input
        size="sm"
        startContent={<Icon fontSize={16} icon="lucide:link" />}
        {...urlProps}
        ref={urlRef as React.Ref<HTMLInputElement>}
        data-plate-focus
        placeholder="Paste link"
        variant="bordered"
      />

      <Input
        data-plate-focus
        placeholder="Text to display"
        size="sm"
        startContent={<Icon fontSize={16} icon="lucide:text" />}
        variant="bordered"
        {...props}
      />
    </div>
  )
}
