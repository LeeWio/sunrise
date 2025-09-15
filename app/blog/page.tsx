'use client'

import { useState } from 'react'
import { Checkbox } from '@heroui/react'

export default function BlogPage() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4">
        <div>
          <Checkbox isSelected={checked} onChange={setChecked}>
            Subscribe to newsletter
          </Checkbox>
          <p className="text-default-500 mt-1 text-sm">Selected: {checked ? 'Yes' : 'No'}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Checkbox defaultSelected isIndeterminate>
            Indeterminate example
          </Checkbox>
          <Checkbox isDisabled>Disabled example</Checkbox>
        </div>
      </div>
    </div>
  )
}
