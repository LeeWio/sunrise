import { Input } from '@heroui/react'

export type IconPickerSearchProps = {
  onSearch: (query: string) => void
}

export const IconPickerSearch = ({ onSearch }: IconPickerSearchProps) => {
  return (
    <Input
      aria-label="Search icons"
      classNames={{
        inputWrapper: 'border-none bg-transparent shadow-none',
      }}
      placeholder="Search icons..."
      onChange={e => onSearch(e.target.value)}
    />
  )
}
