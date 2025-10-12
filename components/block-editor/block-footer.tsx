import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
  Input,
  Select,
  SelectedItems,
  SelectItem,
  Tooltip,
} from '@heroui/react'
import { memo } from 'react'
import { Icon } from '@iconify/react'

import { useAppDispatch } from '@/hooks/store'
import { updateDraft } from '@/feature/slice/article-slice'
import { TagResponse, useGetallQuery } from '@/feature/api/tag-api'
import {
  CategoryResponse,
  useGetallQuery as useGetAllCategoriesQuery,
} from '@/feature/api/category-api'
import { useCreateMutation as useCreateArticleMutation } from '@/feature/api/article-api'
import { useGetAllUsersQuery, UserResponse } from '@/feature/api/auth-api'
import { useDraft } from '@/hooks/use-draft'

export type EditorFooterProps = {
  characters: number
  words: number
  isOpen?: boolean
}

const EditorStats = ({ characters, words }: EditorFooterProps) => (
  <div className="flex flex-col text-neutral-500 justify-center pr-1 text-right">
    <div className="text-xs font-semibold">
      {words} {words === 1 ? 'word' : 'words'}
    </div>
    <div className="text-xs font-semibold">
      {characters} {characters === 1 ? 'character' : 'characters'}
    </div>
  </div>
)

const NotificationIcon = ({
  size,
  height,
  width,
  ...props
}: {
  size?: number
  height?: number
  width?: number
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

// Function to generate a slug from the title
const generateSlugFromTitle = (title: string): string => {
  if (!title) return ''

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

export const EditorFooter = memo(
  ({ isOpen, characters, words }: EditorFooterProps) => {
    const dispatch = useAppDispatch()
    const draft = useDraft()

    const [createArticle, { isLoading, isError, isSuccess, data, error }] =
      useCreateArticleMutation()

    const {
      data: tags,
      isLoading: tagsLoading,
      refetch: refetchTags,
    } = useGetallQuery()

    const {
      data: categories,
      isLoading: categoriesLoading,
      refetch: refetchCategories,
    } = useGetAllCategoriesQuery()

    const {
      data: users,
      isLoading: usersLoading,
      refetch: refetchUsers,
    } = useGetAllUsersQuery()

    return isOpen ? (
      <div className="flex w-full flex-col gap-3">
        <Card isBlurred className="bg-background/30 backdrop-blur-lg">
          <CardBody className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                color="primary"
                defaultValue={draft.title}
                label="Article Title"
                name="title"
                placeholder="Enter a compelling title"
                onChange={e => {
                  dispatch(updateDraft({ title: e.target.value }))
                }}
              />

              <Input
                defaultValue={draft.summary}
                label="Article Summary"
                name="summary"
                placeholder="Briefly describe your article"
                onChange={e =>
                  dispatch(updateDraft({ summary: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                defaultValue={draft.slug}
                label="Article Slug"
                name="slug"
                placeholder="Enter article slug (optional)"
                onChange={e => {
                  // Dispatch an action to update the slug in the store
                  dispatch(updateDraft({ slug: e.target.value }))
                }}
              />
            </div>

            <div className="pt-2">
              {/* TODO: 是否支持实时渲染数据，而不是一股脑子拿到所有数据 */}
              <Select
                isClearable
                isVirtualized
                classNames={{
                  base: 'max-w-xs',
                  trigger: 'h-12',
                }}
                defaultSelectedKeys={new Set(draft.tagIds)}
                isLoading={tagsLoading}
                items={tags || []}
                label="Select Tags"
                labelPlacement="outside"
                placeholder="Search for tag to categorize your article"
                radius="sm"
                renderValue={(tags: SelectedItems<TagResponse>) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Chip
                          key={tag.data?.tid}
                          // TODO: 根据 tag color 显示颜色
                          color="warning"
                          radius="sm"
                          size="sm"
                        >
                          {tag.data?.name}
                        </Chip>
                      ))}
                    </div>
                  )
                }}
                selectionMode="multiple"
                variant="bordered"
                onChange={e => {
                  dispatch(updateDraft({ tagIds: e.target.value.split(',') }))
                }}
                onClear={() => {
                  dispatch(updateDraft({ tagIds: [] }))
                }}
              >
                {tag => (
                  <SelectItem key={tag.tid} textValue={tag.name}>
                    {tag.name}
                  </SelectItem>
                )}
              </Select>
            </div>

            <div className="pt-2">
              {/* TODO: 是否支持实时渲染数据，而不是一股脑子拿到所有数据 */}
              <Select
                isClearable
                isVirtualized
                classNames={{
                  base: 'max-w-xs',
                  trigger: 'h-12',
                }}
                defaultSelectedKeys={new Set([draft.categoryId])}
                isLoading={categoriesLoading}
                items={categories || []}
                label="Select Categories"
                labelPlacement="outside"
                placeholder="Search for categories to categorize your article"
                radius="sm"
                renderValue={(tags: SelectedItems<CategoryResponse>) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Chip
                          key={tag.data?.cid}
                          // TODO: 根据 tag color 显示颜色
                          color="warning"
                          radius="sm"
                          size="sm"
                        >
                          {tag.data?.name}
                        </Chip>
                      ))}
                    </div>
                  )
                }}
                variant="bordered"
                onChange={e => {
                  dispatch(updateDraft({ categoryId: e.target.value }))
                }}
                onClear={() => {
                  dispatch(updateDraft({ categoryId: '' }))
                }}
              >
                {tag => (
                  <SelectItem key={tag.cid} textValue={tag.name}>
                    {tag.name}
                  </SelectItem>
                )}
              </Select>
            </div>

            {/* TODO: 是否支持实时渲染数据，而不是一股脑子拿到所有数据 */}
            <Select
              isClearable
              classNames={{
                base: 'max-w-xs',
                trigger: 'h-12',
              }}
              defaultSelectedKeys={new Set([draft.authorId])}
              isLoading={usersLoading}
              items={users || []}
              label="Select an Author"
              labelPlacement="outside"
              placeholder="Search for authors to assign to your article"
              radius="sm"
              renderValue={(items: SelectedItems<UserResponse>) => {
                return items.map(item => (
                  <div key={item.key} className="flex items-center gap-2">
                    <Avatar
                      alt={item.data?.username}
                      className="shrink-0"
                      size="sm"
                      src={item.data?.avatar}
                    />
                    <div className="flex flex-col">
                      <span>{item.data?.username}</span>
                      <span className="text-default-500 text-tiny">
                        ({item.data?.email})
                      </span>
                    </div>
                  </div>
                ))
              }}
              selectionMode="single"
              onChange={e => {
                dispatch(updateDraft({ authorId: e.target.value }))
              }}
              onClear={() => {
                dispatch(updateDraft({ authorId: '' }))
              }}
            >
              {user => (
                <SelectItem key={user.uid} textValue={user.username}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={user.username}
                      className="shrink-0"
                      size="sm"
                      src={user.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{user.username}</span>
                      <span className="text-tiny text-default-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </CardBody>
          <CardFooter className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-4">
              <div className="text-sm text-default-500">
                {tags ? `${tags.length} tags available` : 'Loading tags...'}
              </div>
              <div className="text-sm text-default-500">
                {categories
                  ? `${categories.length} categories available`
                  : 'Loading categories...'}
              </div>
              <div className="text-sm text-default-500">
                {users ? `${users.length} users available` : 'Loading users...'}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                color="primary"
                isDisabled={tagsLoading}
                size="sm"
                variant="light"
                onClick={() => refetchTags()}
              >
                {tagsLoading ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      aria-label="refetching tags"
                      size="sm"
                      strokeWidth={2}
                    />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:refresh-cw" width={16} />
                    Refresh Tags
                  </div>
                )}
              </Button>
              <Button
                color="secondary"
                isDisabled={categoriesLoading}
                size="sm"
                variant="light"
                onClick={() => refetchCategories()}
              >
                {categoriesLoading ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      aria-label="refetching categories"
                      size="sm"
                      strokeWidth={2}
                    />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:refresh-cw" width={16} />
                    Refresh Categories
                  </div>
                )}
              </Button>
              <Button
                color="default"
                isDisabled={usersLoading}
                size="sm"
                variant="light"
                onClick={() => refetchUsers()}
              >
                {usersLoading ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress
                      aria-label="refetching users"
                      size="sm"
                      strokeWidth={2}
                    />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:refresh-cw" width={16} />
                    Refresh Users
                  </div>
                )}
              </Button>

              <Button
                onPress={e => {
                  try {
                    // Call the mutation
                    createArticle(draft).unwrap()

                    // Reset form after successful creation
                    console.log(data)
                  } catch (err) {
                    console.error('Failed to create category:', err)
                  }
                }}
              >
                Published
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    ) : (
      <div className="flex items-center w-full justify-between py-2">
        <Tooltip content="Toggle Article Details Panel" placement="top">
          <Button isIconOnly size="md" variant="light">
            <Icon
              className="text-default-500"
              fontSize={20}
              icon="lucide:panel-left"
            />
          </Button>
        </Tooltip>

        <CircularProgress
          showValueLabel
          aria-label="editor-footer circular progress"
          classNames={{
            base: 'flex flex-row-reverse',
            svg: 'w-12 h-12',
            value: 'text-xs font-semibold',
          }}
          label={<EditorStats characters={characters} words={words} />}
          maxValue={10000}
          strokeWidth={2}
          value={characters}
        />
      </div>
    )
  }
)

EditorFooter.displayName = 'EditorFooter'
