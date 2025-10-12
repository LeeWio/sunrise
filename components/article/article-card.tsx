'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton,
  cn,
  Image,
  DateInput,
} from '@heroui/react'
import { CalendarDate, parseDate } from '@internationalized/date'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

import { HeartIcon, ReactIcon } from '../icons'

export default function ArticleCard() {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  // 模拟加载过程
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)

    return () => clearTimeout(timer)
  }, [])

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
          <Skeleton className="h-5 w-3/5 rounded-md" /> {/* 标题 */}
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
      isFooterBlurred
      className="relative border-none w-full sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[16/9]"
      radius="lg"
    >
      <Image
        removeWrapper
        alt="Cover Image"
        className="absolute inset-0 z-0 w-full object-cover"
        src="https://picsum.photos/1200/800?random=1"
      />

      <CardHeader className="flex flex-row justify-between">
        <div className="flex gap-1">
          <Chip
            className="bg-background/60 text-foreground/90 shadow-medium dark:bg-default-100/50 gap-1 backdrop-blur-md backdrop-saturate-150"
            radius="sm"
            size="sm"
            startContent={<Icon icon="gravity-ui:star-fill" />}
          >
            Feature
          </Chip>

          <Chip
            className="bg-background/60 text-foreground/90 shadow-medium dark:bg-default-100/50 gap-1 backdrop-blur-md backdrop-saturate-150"
            radius="sm"
            size="sm"
            startContent={<ReactIcon className="text-[#61dafb]" />}
          >
            React
          </Chip>
        </div>

        <Button
          isIconOnly
          className={cn(
            'transition-all duration-200 data-hover:bg-foreground/10! -translate-y-1 translate-x-2',
            liked ? 'text-red-500 scale-110' : 'text-default-900/60 scale-100'
          )}
          radius="full"
          size="sm"
          variant="light"
          onPress={() => setLiked(v => !v)}
        >
          <HeartIcon
            className={liked ? '[&>path]:stroke-transparent' : ''}
            fill={liked ? 'currentColor' : 'none'}
          />
        </Button>
      </CardHeader>

      <CardBody className="relative z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5">
        {/* <div className="flex items-center gap-2 text-xs text-white/70 mb-2"> */}
        {/*   <Icon className="text-white/50" icon="gravity-ui:user" width={14} /> */}
        {/*   <span>by John Doe</span> */}
        {/*   <span className="mx-1">•</span> */}
        {/*   <Icon */}
        {/*     className="text-white/50" */}
        {/*     icon="gravity-ui:calendar" */}
        {/*     width={14} */}
        {/*   /> */}
        {/*   <span>2025-10-12</span> */}
        {/* </div> */}

        {/* 标题 */}
        <h3 className="text-lg md:text-xl font-semibold text-white leading-tight mb-2 line-clamp-1 hover:text-primary transition-colors">
          探索 React Server Components 的核心原理与最佳实践
        </h3>

        <p className="text-sm text-white/80 leading-relaxed line-clamp-4">
          RSC 是 React 未来的重要方向，但你真的理解它的渲染机制吗？
          这篇文章带你从源码角度一探究竟，理解 Server Component
          如何改变前端架构思维。
        </p>
      </CardBody>

      <CardFooter className="justify-between items-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="w-full">
          <Chip
            color="primary"
            startContent={
              <Icon height="16" icon="gravity-ui:thumbs-up-fill" width="16" />
            }
            variant="light"
          >
            128
          </Chip>
          <Chip
            color="warning"
            startContent={<Icon icon="gravity-ui:comment" width={16} />}
            variant="light"
          >
            24
          </Chip>
          <Chip
            color="success"
            startContent={<Icon icon="gravity-ui:eye" width={16} />}
            variant="light"
          >
            1.2k
          </Chip>
        </div>
        <div className="flex justify-end items-center">
          <DateInput
            isDisabled
            classNames={{
              inputWrapper: 'bg-transparent ',
              segment: 'text-danger!',
            }}
            defaultValue={parseDate('2024-04-04')}
            placeholderValue={new CalendarDate(1995, 11, 6)}
            size="sm"
            startContent={
              <Icon
                className="text-danger"
                icon="gravity-ui:calendar"
                width={22}
              />
            }
          />
        </div>
      </CardFooter>
    </Card>
  )
}
