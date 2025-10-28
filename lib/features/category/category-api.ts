// Category API types and interfaces matching backend Horizon project

// Category interface matching backend CategoryVO
export interface Category {
  /** Category ID */
  cid: string;

  /** Category name */
  name: string;

  /** Category slug (URL-friendly identifier) */
  slug: string;

  /** Category description */
  description?: string;

  /** Parent category ID (for hierarchical structure) */
  parentId?: string;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;
}

// Category with nested children
export interface CategoryTree extends Category {
  /** Child categories */
  children?: CategoryTree[];

  /** Level in hierarchy (0 = root) */
  level?: number;

  /** Number of articles in this category (including subcategories) */
  articleCount?: number;

  /** Whether this category has children */
  hasChildren?: boolean;
}

// Request/Response types for category operations
export interface CreateCategoryRequest {
  /** Category name */
  name: string;

  /** Category slug */
  slug?: string;

  /** Category description */
  description?: string;

  /** Parent category ID */
  parentId?: string;
}

export interface UpdateCategoryRequest {
  /** Category ID */
  cid: string;

  /** Category name */
  name?: string;

  /** Category slug */
  slug?: string;

  /** Category description */
  description?: string;

  /** Parent category ID */
  parentId?: string;
}

export interface SearchCategoriesRequest {
  /** Search keyword */
  keyword?: string;

  /** Parent category filter */
  parentId?: string;

  /** Include child categories */
  includeChildren?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: 'name' | 'createdAt' | 'articleCount';

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

// Category with statistics
export interface CategoryWithStats extends Category {
  /** Number of articles in this category */
  articleCount?: number;

  /** Number of total views for articles in this category */
  totalViews?: number;

  /** Number of subcategories */
  subcategoryCount?: number;

  /** Most recent articles in this category */
  recentArticles?: Array<{
    aid: string;
    title: string;
    createdAt: string;
  }>;
}

// API interface definitions (no implementations)
export interface CategoryAPI {
  // Category CRUD
  createCategory(categoryData: CreateCategoryRequest): Promise<Category>;
  updateCategory(categoryData: UpdateCategoryRequest): Promise<Category>;
  getCategoryById(cid: string): Promise<Category>;
  deleteCategory(cid: string): Promise<void>;
  
  // Category listing and search
  getAllCategories(params?: SearchCategoriesRequest): Promise<PageResponse<Category>>;
  getCategoryTree(parentId?: string): Promise<CategoryTree[]>;
  getRootCategories(): Promise<Category[]>;
  getSubcategories(parentId: string): Promise<Category[]>;
  searchCategories(keyword: string, page?: number, size?: number): Promise<PageResponse<Category>>;
  
  // Category with statistics
  getCategoriesWithStats(): Promise<CategoryWithStats[]>;
  getCategoryStats(cid: string): Promise<CategoryWithStats>;
  getPopularCategories(limit?: number): Promise<CategoryWithStats[]>;
  
  // Category management (admin)
  getCategoryOverview(): Promise<{
    totalCategories: number;
    totalArticles: number;
    rootCategories: Category[];
    popularCategories: CategoryWithStats[];
  }>;
  
  // Batch operations
  reorderCategories(categoryIds: string[]): Promise<void>;
  moveCategory(cid: string, newParentId?: string): Promise<Category>;
}

// Reuse PageResponse from user-api
import type { PageResponse } from '../user/user-api';
