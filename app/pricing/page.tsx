'use client'
import { Chip } from '@heroui/chip'
import { Button } from '@heroui/button'

import { title } from '@/components/primitives'

export default function PricingPage() {
  return (
    <div>
      <Chip color="default">
        <Button>adsf</Button>
      </Chip>
      <h1 className={title()}>Pricing</h1>
    </div>
  )
}
