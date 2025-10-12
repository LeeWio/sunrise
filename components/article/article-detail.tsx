import { ArticleResponse } from '@/feature/api/article-api'

export const ArticleDetail = ({ article }: { article: ArticleResponse }) => {
  return <>{article?.title}</>
}
