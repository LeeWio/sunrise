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
import { ReactIcon } from '@/components/icons'

export default function BlogPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <ArticleCard
        featured
        comments={24}
        cover="https://picsum.photos/1200/800?random=5"
        date="2025-09-28T14:12:00"
        description="RSC 是 React 未来的重要方向，但你真的理解它的渲染机制吗？这篇文章带你从源码角度一探究竟。"
        likes={128}
        tags={[
          { label: 'React', icon: <ReactIcon className="text-[#61dafb]" /> },
        ]}
        title="探索 React Server Components 的核心原理与最佳实践"
        views="1.2k"
      />
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
