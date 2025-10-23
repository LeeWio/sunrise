'use client'

import { memo } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from '@heroui/react'
import { motion } from 'framer-motion'

import { BookOpenIcon, ArrowRightIcon, CalendarIcon, EyeIcon } from '../icons'

// Types
interface Article {
  id: string
  title: string
  date: string
  views?: string | number
}

interface ColumnCardProps {
  title: string
  articles: Article[]
  gradientColors: string[]
  icon?: React.ReactNode
  totalArticles: number
}

// Utility Functions
const createGradientStyle = (colors: string[]) => ({
  background: `radial-gradient(ellipse at top left, ${colors.join(', ')})`,
})

const createAriaLabel = (title: string) => `${title} articles`

// Animation Configs
const cardAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const

export const ColumnCard = memo(
  ({
    title,
    articles,
    gradientColors,
    icon,
    totalArticles,
  }: ColumnCardProps) => {
    const cardStyle = createGradientStyle(gradientColors)

    return (
      <motion.div {...cardAnimations} whileHover={cardAnimations.hover}>
        <Card
          className="h-[28rem] shadow-xl overflow-hidden group"
          style={cardStyle}
        >
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Chip
                  className="bg-white/20 text-white"
                  size="lg"
                  variant="flat"
                >
                  {icon || <BookOpenIcon size={20} />}
                </Chip>
                <h3
                  className="text-xl font-bold text-white truncate"
                  title={title}
                >
                  {title}
                </h3>
              </div>
              <span className="text-white/60 text-sm font-medium">
                {totalArticles}
              </span>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col">
            <ScrollShadow className="flex-1 overflow-y-auto scrollbar-hide">
              <Listbox aria-label={createAriaLabel(title)}>
                {articles.map(article => (
                  <ListboxItem
                    key={article.id}
                    className="group data-[hover=true]:bg-white/20 transition-colors duration-200 rounded-lg cursor-pointer last:mb-0"
                    textValue={article.title}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col flex-1 min-w-0 pr-3">
                        <span
                          className="text-white font-medium text-sm truncate"
                          title={article.title}
                        >
                          {article.title}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-white/60 text-xs">
                            <CalendarIcon size={12} />
                            {article.date}
                          </span>
                          {article.views && (
                            <span className="flex items-center gap-1 text-white/60 text-xs">
                              <EyeIcon size={12} />
                              {article.views}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRightIcon
                        className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                        size={14}
                      />
                    </div>
                  </ListboxItem>
                ))}
              </Listbox>
            </ScrollShadow>
          </CardBody>
        </Card>
      </motion.div>
    )
  }
)

ColumnCard.displayName = 'ColumnCard'
