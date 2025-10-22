import { Input } from '@heroui/react'
import { SearchIcon } from '@/components/icons'

export type IconPickerSearchProps = {
  onSearch: (query: string) => void
  onClear?: () => void
}

export const IconPickerSearch = ({ onSearch, onClear }: IconPickerSearchProps) => {
  return (
    <Input
      fullWidth
      isClearable
      aria-label="Search icons"
      placeholder="Search icons..."
      onChange={(e) => onSearch(e.target.value)}
      onClear={() => {
        onSearch('')
        onClear?.()
      }}
      size="sm"
      autoComplete="off"
      startContent={<SearchIcon size={16} />}
    />
  )
}