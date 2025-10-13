'use client'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton,
  Image,
  Tooltip,
} from '@heroui/react'
import { useEffect, useState } from 'react'

import { CommentIcon, EyeIcon, StarIcon, ThumbsUpIcon } from '../icons'

interface ArticleCardProps {
  title: string
  description: string
  cover: string
  tags?: { label: string; icon?: React.ReactNode }[]
  likes?: number
  comments?: number
  views?: string | number
  date?: string
  featured?: boolean
  loading?: boolean
}

export default function ArticleCard({
  title,
  description,
  cover,
  tags = [],
  likes = 0,
  comments = 0,
  views = 0,
  date,
  featured = false,
  loading: loadingProp = false,
}: ArticleCardProps) {
  const [loading, setLoading] = useState(loadingProp)

  useEffect(() => {
    if (loadingProp) return
    const timer = setTimeout(() => setLoading(false), 1000)

    return () => clearTimeout(timer)
  }, [loadingProp])

  if (loading) {
    return (
      <Card
        isBlurred
        className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[16/9] overflow-hidden border-none"
        radius="lg"
      >
        <Skeleton className="absolute inset-0">
          <div className="h-full w-full bg-default-300" />
        </Skeleton>

        <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-14 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-12 left-5 right-5 z-10 space-y-3">
          <Skeleton className="h-5 w-3/5 rounded-md" />
          <Skeleton className="h-3 w-5/6 rounded-md" />
          <Skeleton className="h-3 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-3/4 rounded-md" />
        </div>

        <div className="absolute bottom-2 left-2 right-2 z-10 flex gap-3 px-3 py-1">
          <Skeleton className="h-5 w-10 rounded-md" />
          <Skeleton className="h-5 w-10 rounded-md" />
          <Skeleton className="h-5 w-10 rounded-md" />
        </div>
      </Card>
    )
  }

  return (
    <Card
      isBlurred
      className="dynamic-gradient-bg border-none w-full sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[16/9]"
      radius="lg"
    >
      <CardHeader className="flex flex-col gap-0.5 items-start">
        <div className="flex gap-1">
          {featured && (
            <Chip
              radius="sm"
              size="sm"
              className="before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl"
              startContent={<StarIcon/>}
              variant="light"
            >
              Feature
            </Chip>
          )}

          {tags.map(tag => (
            <Chip
              key={tag.label}
              radius="sm"
              className="before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl"
              size="sm"
              startContent={tag.icon}
              variant="light"
            >
              {tag.label}
            </Chip>
          ))}
        </div>
      </CardHeader>

      <CardBody className="relative z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5">
        <h3 className="text-lg md:text-xl font-semibold text-white leading-tight mb-2 line-clamp-1 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/80 leading-relaxed line-clamp-4">
          {description}
        </p>
      </CardBody>

      <CardFooter className="justify-between items-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="flex-1 flex gap-2">
          <Chip color="primary" startContent={<ThumbsUpIcon />} variant="light">
            {likes}
          </Chip>
          <Chip color="warning" startContent={<CommentIcon />} variant="light">
            {comments}
          </Chip>
          <Chip color="success" startContent={<EyeIcon />} variant="light">
            {views}
          </Chip>
        </div>

        {date && (
          <Tooltip showArrow content={`Posted ${date}`}>
            <span className="text-small text-neutral-500 whitespace-nowrap">
              {getRelativeTime(date)}
            </span>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  )
}

/** 辅助函数：把日期转换为 “x days ago” */
function getRelativeTime(dateStr: string) {
  const date = new Date(dateStr)
  const diff = Date.now() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return days <= 0 ? 'today' : `${days} days ago`
}
