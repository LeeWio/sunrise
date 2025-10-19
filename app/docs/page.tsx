'use client'

import { Button, Link } from '@heroui/react'
import React, { useState } from 'react'

import {
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useGetTagsQuery,
  useGetAllTagsQuery,
} from '@/feature/api/tag-api'

export default function DocsPage() {
  // Tag API 测试状态
  const [tagName, setTagName] = useState('Test Tag')
  const [tagId, setTagId] = useState('')

  // Tag API Hooks
  const [createTag, { isLoading: isCreating }] = useCreateTagMutation()
  const { data: paginatedTags, isLoading: isLoadingPaginated } =
    useGetTagsQuery({ page: 1, size: 5 })

  const { data: allTags, isLoading: isLoadingAll } = useGetAllTagsQuery()

  const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation()
  const [deleteTag, { isLoading: isDeleting }] = useDeleteTagMutation()

  // 创建标签测试
  const handleCreateTag = async () => {
    try {
      await createTag({
        name: tagName,
        icon: 'test-icon',
        description: 'Test tag description',
      }).unwrap()
    } catch (error) {
      console.error('Failed to create tag:', error)
    }
  }

  // 更新标签测试
  const handleUpdateTag = async () => {
    if (!tagId) {
      return
    }

    try {
      await updateTag({
        tid: tagId,
        name: `${tagName} - Updated`,
        description: 'Updated test tag description',
      }).unwrap()
    } catch (error) {
      console.error('Failed to update tag:', error)
    }
  }

  // 删除标签测试
  const handleDeleteTag = async (tid: string) => {
    try {
      await deleteTag(tid).unwrap()
      if (tid === tagId) {
        setTagId('')
      }
    } catch (error) {
      console.error('Failed to delete tag:', error)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tag API 测试页面</h1>

      {/* 创建标签测试 */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">创建标签测试</h2>
        <div className="flex gap-4 items-end">
          <div>
            <input
              className="border rounded px-3 py-2"
              placeholder="输入标签名称"
              type="text"
              value={tagName}
              onChange={e => setTagName(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            isLoading={isCreating}
            onPress={handleCreateTag}
          >
            创建标签
          </Button>
        </div>
      </div>

      {/* 更新和删除标签测试 */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">更新/删除标签测试</h2>
        <div className="flex gap-4">
          <Button
            color="secondary"
            isDisabled={!tagId}
            isLoading={isUpdating}
            onPress={handleUpdateTag}
          >
            更新标签
          </Button>
          <Button
            color="danger"
            isDisabled={!tagId}
            isLoading={isDeleting}
            onPress={() => handleDeleteTag(tagId)}
          >
            删除标签
          </Button>
          {tagId && <p className="py-2">当前标签 ID: {tagId}</p>}
        </div>
      </div>

      {/* 分页标签列表 */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">分页标签列表</h2>
        {isLoadingPaginated ? (
          <p>加载中...</p>
        ) : paginatedTags && paginatedTags.content.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedTags.content.map(tag => (
              <div key={tag.tid} className="p-3 border rounded">
                <h3 className="font-medium">{tag.name}</h3>
                <p className="text-sm text-gray-600">ID: {tag.tid}</p>
                <p className="text-sm text-gray-600">描述: {tag.description}</p>
                <p className="text-xs text-gray-500">
                  创建时间: {new Date(tag.createdAt).toLocaleString()}
                </p>
                <div className="mt-2 flex gap-2">
                  <Button
                    color="danger"
                    size="sm"
                    onPress={() => handleDeleteTag(tag.tid)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>暂无标签数据</p>
        )}
      </div>

      {/* 所有标签列表 */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">所有标签列表</h2>
        {isLoadingAll ? (
          <p>加载中...</p>
        ) : allTags && allTags.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allTags.map(tag => (
              <div key={tag.tid} className="p-3 border rounded">
                <h3 className="font-medium">{tag.name}</h3>
                <p className="text-sm text-gray-600">ID: {tag.tid}</p>
                <p className="text-xs text-gray-500">图标: {tag.icon}</p>
                <div className="mt-2 flex gap-2">
                  <Button
                    color="danger"
                    size="sm"
                    onPress={() => handleDeleteTag(tag.tid)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>暂无标签数据</p>
        )}
      </div>

      {/* 原有链接 */}
      <Button as={Link} href="/blog/ed8d818d-a250-4a8a-9fd5-bcdd80904301">
        /blog/ed8d818d-a250-4a8a-9fd5-bcdd80904301
      </Button>
    </div>
  )
}

