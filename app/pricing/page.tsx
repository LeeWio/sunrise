'use client'

import React, { useState } from 'react'
import { Input, Button, Textarea } from '@heroui/react'

import { useCreateMutation as useCreateCategoryMutation } from '@/feature/api/category-api'

export default function PricingPage() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#8b5cf6') // Default purple color for categories
  const [parent, setParent] = useState('')

  // Use the category create mutation hook
  const [createCategory, { isLoading, isError, isSuccess, data, error }] =
    useCreateCategoryMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare the category payload
    const categoryPayload = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'), // Auto-generate slug if not provided
      description,
      color,
      parent: parent || undefined, // Only include parent if it's provided
    }

    try {
      // Call the mutation
      await createCategory(categoryPayload).unwrap()

      // Reset form after successful creation
      setName('')
      setSlug('')
      setDescription('')
      setColor('#8b5cf6')
      setParent('')

      console.log(data)
    } catch (err) {
      console.error('Failed to create category:', err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Category Creation Demo</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            isRequired
            label="Category Name"
            placeholder="Enter category name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <Input
            label="Slug"
            placeholder="Enter category slug (optional)"
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </div>

        <div>
          <Input
            label="Parent Category ID"
            placeholder="Enter parent category ID (optional)"
            value={parent}
            onChange={e => setParent(e.target.value)}
          />
        </div>

        <div>
          <Textarea
            label="Description"
            placeholder="Enter category description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium" htmlFor="color-picker">
            Color:
          </label>
          <input
            className="w-10 h-10 border-0 rounded cursor-pointer"
            id="color-picker"
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <span className="text-sm text-gray-600">{color}</span>
        </div>

        <Button
          className="w-full"
          color="primary"
          disabled={isLoading}
          isLoading={isLoading}
          type="submit"
        >
          {isLoading ? 'Creating Category...' : 'Create Category'}
        </Button>
      </form>

      {/* Status messages */}
      {isSuccess && data && (
        <div className="mt-6 p-4 bg-success/10 border border-success rounded-lg">
          <h3 className="font-semibold text-success">
            Category Created Successfully!
          </h3>
          <p>ID: {data.cid}</p>
          <p>Name: {data.name}</p>
          <p>Slug: {data.slug}</p>
          <p>Parent: {data.parent || 'None'}</p>
        </div>
      )}

      {isError && (
        <div className="mt-6 p-4 bg-danger/10 border border-danger rounded-lg">
          <h3 className="font-semibold text-danger">Error Creating Category</h3>
          <p>
            {error && typeof error === 'object' && 'data' in error
              ? (error.data as any)?.message || 'An error occurred'
              : 'An error occurred'}
          </p>
        </div>
      )}
    </div>
  )
}
