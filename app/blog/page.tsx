'use client'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  useDisclosure,
} from '@heroui/react'
import { Icon } from '@iconify/react'

import { BlockEditor } from '@/components/block-editor/block-editor'
import ArticleCard from '@/components/article/article-card'

export default function BlogPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <ArticleCard />
      <Card isBlurred className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://heroui.com/images/hero-card-complete.jpeg"
            width={270}
          />
        </CardBody>
      </Card>
      <Button
        endContent={<Icon fontSize={20} icon="lucide:plus" />}
        onPress={onOpen}
      >
        add article
      </Button>
      <BlockEditor
        isModalOpen={isOpen}
        readOnly={false}
        onModalOpenChange={onOpenChange}
      />
    </div>
  )
}
