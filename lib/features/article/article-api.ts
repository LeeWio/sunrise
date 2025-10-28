// Article API types and interfaces matching backend Horizon project

// Article status enum matching backend ArticleStatus
export type ArticleStatus =
  | "REVIEW"
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | "SCHEDULED";

// Author interface (simplified User)
export interface Author {
  uid: string;
  username: string;
  email: string;
  avatar?: string;
}

// Category interface (from CategoryVO)
export interface Category {
  cid: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Series interface (from SeriesVO)
export interface Series {
  sid: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tag interface (from TagVO)
export interface Tag {
  tid: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Article interface matching backend ArticleVO
export interface Article {
  /** Article ID */
  aid: string;

  /** Article title */
  title: string;

  /** Article slug (URL-friendly identifier) */
  slug: string;

  /** Article summary/excerpt */
  summary?: string;

  /** Article content (full text) */
  content: string;

  /** Cover image URL */
  coverImage?: string;

  /** Article status */
  status: ArticleStatus;

  /** Author ID */
  authorId: string;

  /** Creator user ID */
  createdBy?: string;

  /** Updater user ID */
  updatedBy?: string;

  /** Creation timestamp */
  createdAt: string;

  /** Update timestamp */
  updatedAt: string;

  /** Whether article is featured */
  isFeatured?: boolean;

  /** View count */
  viewCount?: number;

  /** Associated categories */
  categories?: Category[];

  /** Associated series */
  series?: Series[];

  /** Associated tags */
  tags?: Tag[];
}

// SEO metadata interface (from ArticleDetailVO.SeoMetadata)
export interface SeoMetadata {
  /** SEO title */
  seoTitle?: string;

  /** SEO description */
  seoDescription?: string;

  /** SEO keywords */
  seoKeywords?: string;

  /** Canonical URL */
  canonicalUrl?: string;

  /** Open Graph title */
  ogTitle?: string;

  /** Open Graph description */
  ogDescription?: string;

  /** Open Graph image */
  ogImage?: string;

  /** Open Graph type */
  ogType?: string;

  /** Twitter card type */
  twitterCard?: string;

  /** Twitter site */
  twitterSite?: string;

  /** JSON-LD structured data */
  jsonLd?: string;

  /** Robots meta tag */
  robotsMeta?: string;
}

// Interaction statistics interface (from ArticleDetailVO.InteractionStats)
export interface InteractionStats {
  /** Like count */
  likeCount?: number;

  /** Favorite/bookmark count */
  favoriteCount?: number;

  /** Share count */
  shareCount?: number;

  /** Comment count */
  commentCount?: number;

  /** Current user's like status */
  isLiked?: boolean;

  /** Current user's favorite status */
  isFavorited?: boolean;
}

// Article detail interface (from ArticleDetailVO)
export interface ArticleDetail extends Article {
  /** SEO metadata */
  seo?: SeoMetadata;

  /** Interaction statistics */
  stats?: InteractionStats;

  /** Meta tags map for frontend rendering */
  metaTags?: Record<string, string>;

  /** Open Graph tags map */
  ogTags?: Record<string, string>;
}

// Request/Response types for article operations
export interface CreateArticleRequest {
  /** Article title */
  title: string;

  /** Article slug */
  slug?: string;

  /** Article summary */
  summary?: string;

  /** Article content */
  content: string;

  /** Cover image URL */
  coverImage?: string;

  /** Article status */
  status?: ArticleStatus;

  /** Scheduled publish time */
  publishTime?: string;

  /** Author ID */
  authorId: string;

  /** Category IDs */
  categoryIds?: string[];

  /** Series IDs */
  seriesIds?: string[];

  /** Tag IDs */
  tagIds?: string[];
}

export interface UpdateArticleRequest {
  /** Article ID */
  aid: string;

  /** Article title */
  title?: string;

  /** Article slug */
  slug?: string;

  /** Article summary */
  summary?: string;

  /** Article content */
  content?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Article status */
  status?: ArticleStatus;

  /** Scheduled publish time */
  publishTime?: string;

  /** Category IDs */
  categoryIds?: string[];

  /** Series IDs */
  seriesIds?: string[];

  /** Tag IDs */
  tagIds?: string[];
}

export interface SearchArticlesRequest {
  /** Search keyword */
  keyword?: string;

  /** Author ID filter */
  authorId?: string;

  /** Category ID filter */
  categoryId?: string;

  /** Tag ID filter */
  tagId?: string;

  /** Status filter */
  status?: ArticleStatus;

  /** Featured filter */
  isFeatured?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: "createdAt" | "updatedAt" | "title" | "viewCount";

  /** Sort direction */
  sortDirection?: "asc" | "desc";
}

export interface TrendingArticlesRequest {
  /** Time period (day, week, month) */
  period?: "day" | "week" | "month";

  /** Limit count */
  limit?: number;

  /** Category filter */
  categoryId?: string;
}

export interface InteractionRequest {
  /** Article ID */
  articleId: string;

  /** Interaction type */
  type: "LIKE" | "FAVORITE" | "SHARE";

  /** Action (true for add, false for remove) */
  action: boolean;
}

export interface RecordReadingRequest {
  /** Article ID */
  articleId: string;

  /** Reading duration in seconds */
  duration?: number;

  /** Read percentage (0-100) */
  percentage?: number;
}

// API interface definitions (no implementations)
export interface ArticleAPI {
  // Article CRUD
  createArticle(articleData: CreateArticleRequest): Promise<Article>;
  updateArticle(articleData: UpdateArticleRequest): Promise<Article>;
  getArticleById(aid: string): Promise<ArticleDetail>;
  deleteArticle(aid: string): Promise<void>;

  // Article listing and search
  getArticles(params: SearchArticlesRequest): Promise<PageResponse<Article>>;
  getTrendingArticles(params: TrendingArticlesRequest): Promise<Article[]>;
  getFeaturedArticles(limit?: number): Promise<Article[]>;
  getArticlesByAuthor(
    authorId: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Article>>;
  getArticlesByCategory(
    categoryId: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Article>>;
  getArticlesByTag(
    tagId: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Article>>;
  getArticlesBySeries(
    seriesId: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Article>>;

  // Article interactions
  likeArticle(articleId: string): Promise<void>;
  unlikeArticle(articleId: string): Promise<void>;
  favoriteArticle(articleId: string): Promise<void>;
  unfavoriteArticle(articleId: string): Promise<void>;
  shareArticle(articleId: string): Promise<void>;

  // Reading tracking
  recordReading(readingData: RecordReadingRequest): Promise<void>;
  getReadingHistory(
    userId?: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<Article>>;

  // Article management (admin)
  publishArticle(aid: string): Promise<Article>;
  archiveArticle(aid: string): Promise<Article>;
  featureArticle(aid: string, featured: boolean): Promise<Article>;
}

// Reuse PageResponse from user-api
import type { PageResponse } from "../user/user-api";
