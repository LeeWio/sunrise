// Series API types and interfaces matching backend Horizon project

// Series status enum matching backend SeriesStatus
export type SeriesStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// Series interface matching backend SeriesVO
export interface Series {
  /** Series ID */
  sid: string;

  /** Series name */
  name: string;

  /** Series slug (URL-friendly identifier) */
  slug: string;

  /** Series description */
  description?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Series status */
  status: SeriesStatus;

  /** Author ID */
  authorId: string;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;

  /** Number of articles in this series */
  articleCount?: number;
}

// Series with detailed information
export interface SeriesDetail extends Series {
  /** Author information */
  author?: {
    uid: string;
    username: string;
    avatar?: string;
  };

  /** Articles in this series */
  articles?: Array<{
    aid: string;
    title: string;
    slug: string;
    summary?: string;
    coverImage?: string;
    publishedAt: string;
    readTime?: number;
  }>;

  /** Series statistics */
  stats?: {
    totalArticles: number;
    totalViews: number;
    totalLikes: number;
    averageReadTime: number;
    completionRate?: number;
  };

  /** Whether current user follows this series */
  isFollowed?: boolean;

  /** Whether current user can edit this series */
  canEdit?: boolean;
}

// Request/Response types for series operations
export interface CreateSeriesRequest {
  /** Series name */
  name: string;

  /** Series slug */
  slug?: string;

  /** Series description */
  description?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Series status */
  status?: SeriesStatus;

  /** Author ID */
  authorId: string;
}

export interface UpdateSeriesRequest {
  /** Series ID */
  sid: string;

  /** Series name */
  name?: string;

  /** Series slug */
  slug?: string;

  /** Series description */
  description?: string;

  /** Cover image URL */
  coverImage?: string;

  /** Series status */
  status?: SeriesStatus;
}

export interface SearchSeriesRequest {
  /** Search keyword */
  keyword?: string;

  /** Author ID filter */
  authorId?: string;

  /** Status filter */
  status?: SeriesStatus;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'articleCount';

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

export interface AddToSeriesRequest {
  /** Series ID */
  seriesId: string;

  /** Article IDs to add */
  articleIds: string[];
}

export interface ReorderSeriesArticlesRequest {
  /** Series ID */
  seriesId: string;

  /** Article IDs in new order */
  articleIds: string[];
}

// API interface definitions (no implementations)
export interface SeriesAPI {
  // Series CRUD
  createSeries(seriesData: CreateSeriesRequest): Promise<Series>;
  updateSeries(seriesData: UpdateSeriesRequest): Promise<Series>;
  getSeriesById(sid: string): Promise<SeriesDetail>;
  deleteSeries(sid: string): Promise<void>;
  
  // Series listing and search
  getAllSeries(params?: SearchSeriesRequest): Promise<PageResponse<Series>>;
  getSeriesByAuthor(authorId: string, page?: number, size?: number): Promise<PageResponse<Series>>;
  getPopularSeries(limit?: number): Promise<Series[]>;
  getPublishedSeries(page?: number, size?: number): Promise<PageResponse<Series>>;
  searchSeries(keyword: string, page?: number, size?: number): Promise<PageResponse<Series>>;
  
  // Series management
  addArticlesToSeries(request: AddToSeriesRequest): Promise<Series>;
  removeArticlesFromSeries(seriesId: string, articleIds: string[]): Promise<Series>;
  reorderSeriesArticles(request: ReorderSeriesArticlesRequest): Promise<Series>;
  getSeriesArticles(sid: string, page?: number, size?: number): Promise<PageResponse<Article>>;
  
  // Series interactions
  followSeries(sid: string): Promise<void>;
  unfollowSeries(sid: string): Promise<void>;
  getFollowedSeries(userId?: string, page?: number, size?: number): Promise<PageResponse<Series>>;
  
  // Series statistics
  getSeriesStats(sid: string): Promise<{
    totalArticles: number;
    totalViews: number;
    totalLikes: number;
    totalFollowers: number;
    recentActivity: Array<{
      type: 'article_added' | 'article_updated' | 'series_updated';
      timestamp: string;
      details: any;
    }>;
  }>;
  
  // Series analytics (author)
  getAuthorSeriesStats(authorId: string): Promise<{
    totalSeries: number;
    totalArticles: number;
    totalViews: number;
    totalFollowers: number;
    popularSeries: Series[];
  }>;
}

// Reuse types from other modules
import type { PageResponse } from '../user/user-api';
import type { Article } from '../article/article-api';
