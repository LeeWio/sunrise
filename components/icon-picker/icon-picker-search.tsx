import type { IconPickerSearchBarProps } from './types'

import { Input } from '@heroui/react'

import { SearchIcon } from '@/components/icons'

export function IconPickerSearchBar({
  searchValue,
  onSearchChange,
  onClear,
}: IconPickerSearchBarProps) {
  return (
    <Input
      fullWidth
      isClearable
      aria-label="Search icons"
      placeholder="Search icons..."
      size="sm"
      startContent={<SearchIcon className="text-default-400" size={18} />}
      value={searchValue}
      variant="flat"
      onChange={e => onSearchChange(e.target.value)}
      onClear={onClear}
    />
  )
}
