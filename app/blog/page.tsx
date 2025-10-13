'use client'

import { Button, useDisclosure } from '@heroui/react'
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
