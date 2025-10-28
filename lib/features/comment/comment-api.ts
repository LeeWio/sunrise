// Comment API types and interfaces matching backend Horizon project

// Comment status enum matching backend CommentStatus
export type CommentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELETED';

// Comment interface matching backend CommentVO
export interface Comment {
  /** Comment ID */
  cid: string;

  /** Article ID */
  articleId: string;

  /** User ID */
  userId: string;

  /** Comment content */
  content: string;

  /** Parent comment ID (for nested replies) */
  parentId?: string;

  /** Like count */
  likesCount?: number;

  /** Creation timestamp */
  createdAt: string;

  /** Update timestamp */
  updatedAt: string;
}

// Comment with user information
export interface CommentWithUser extends Comment {
  /** User information */
  user?: {
    uid: string;
    username: string;
    avatar?: string;
  };

  /** Current user's like status */
  isLiked?: boolean;

  /** Whether comment can be edited/deleted by current user */
  canEdit?: boolean;

  /** Whether comment can be moderated by current user */
  canModerate?: boolean;

  /** Nested replies */
  replies?: CommentWithUser[];

  /** Total reply count */
  replyCount?: number;
}

// Comment tree structure
export interface CommentTree {
  /** Comment information */
  comment: CommentWithUser;

  /** Nested replies */
  replies: CommentTree[];

  /** Depth level in tree */
  level: number;
}

// Request/Response types for comment operations
export interface CreateCommentRequest {
  /** Article ID */
  articleId: string;

  /** User ID */
  userId: string;

  /** Comment content */
  content: string;

  /** Parent comment ID (for replies) */
  parentId?: string;
}

export interface UpdateCommentRequest {
  /** Comment ID */
  cid: string;

  /** Comment content */
  content: string;
}

export interface ModerateCommentRequest {
  /** Comment ID */
  cid: string;

  /** New status */
  status: CommentStatus;

  /** Moderation reason */
  reason?: string;
}

export interface SearchCommentsRequest {
  /** Article ID filter */
  articleId?: string;

  /** User ID filter */
  userId?: string;

  /** Status filter */
  status?: CommentStatus;

  /** Parent comment ID filter */
  parentId?: string;

  /** Include replies */
  includeReplies?: boolean;

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;

  /** Sort field */
  sortBy?: 'createdAt' | 'updatedAt' | 'likesCount';

  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
}

export interface GetCommentsRequest {
  /** Article ID */
  articleId: string;

  /** Include replies */
  includeReplies?: boolean;

  /** Maximum depth for nested replies */
  maxDepth?: number;

  /** Sort by */
  sortBy?: 'newest' | 'oldest' | 'popular';

  /** Page number (0-based) */
  page?: number;

  /** Page size */
  size?: number;
}

// Comment statistics
export interface CommentStats {
  /** Total comments count */
  totalComments: number;

  /** Pending comments count (for moderation) */
  pendingComments: number;

  /** Approved comments count */
  approvedComments: number;

  /** Rejected comments count */
  rejectedComments: number;

  /** Comments by status */
  commentsByStatus: Record<CommentStatus, number>;

  /** Recent comments */
  recentComments: CommentWithUser[];
}

// API interface definitions (no implementations)
export interface CommentAPI {
  // Comment CRUD
  createComment(commentData: CreateCommentRequest): Promise<Comment>;
  updateComment(commentData: UpdateCommentRequest): Promise<Comment>;
  getCommentById(cid: string): Promise<CommentWithUser>;
  deleteComment(cid: string): Promise<void>;
  
  // Comment listing and search
  getCommentsByArticle(params: GetCommentsRequest): Promise<PageResponse<CommentWithUser>>;
  getCommentTree(articleId: string, maxDepth?: number): Promise<CommentTree[]>;
  getCommentsByUser(userId: string, page?: number, size?: number): Promise<PageResponse<CommentWithUser>>;
  searchComments(params: SearchCommentsRequest): Promise<PageResponse<CommentWithUser>>;
  
  // Comment interactions
  likeComment(cid: string): Promise<void>;
  unlikeComment(cid: string): Promise<void>;
  reportComment(cid: string, reason: string): Promise<void>;
  
  // Comment moderation (admin)
  moderateComment(moderationData: ModerateCommentRequest): Promise<Comment>;
  getPendingComments(page?: number, size?: number): Promise<PageResponse<CommentWithUser>>;
  approveComment(cid: string): Promise<Comment>;
  rejectComment(cid: string, reason?: string): Promise<Comment>;
  bulkModerateComments(commentIds: string[], status: CommentStatus, reason?: string): Promise<Comment[]>;
  
  // Comment statistics
  getCommentStats(articleId?: string): Promise<CommentStats>;
  getUserCommentStats(userId: string): Promise<{
    totalComments: number;
    totalLikes: number;
    recentComments: CommentWithUser[];
  }>;
  
  // Comment management
  pinComment(cid: string, pinned: boolean): Promise<Comment>;
  highlightComment(cid: string, highlighted: boolean): Promise<Comment>;
}

// Reuse PageResponse from user-api
import type { PageResponse } from '../user/user-api';
