/**
 * ========================================
 * 🎯 核心文件类型定义
 * ========================================
 */

/**
 * 📤 文件上传相关类型
 */

/**
 * 文件上传成功响应
 * 用途：API 返回上传成功后的文件信息
 */
export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  publicAccess: boolean;
  folder?: string;
  uploadedBy?: string;
  metadata?: Record<string, any>;
}

/**
 * 文件上传进度信息
 * 用途：实时跟踪上传进度，用于显示进度条
 */
export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  speed?: number; // 上传速度 bytes/s
  timeRemaining?: number; // 剩余时间（秒）
}

/**
 * 文件上传配置选项
 * 用途：控制上传行为的配置参数
 */
export interface FileUploadOptions {
  maxSize?: number; // 最大文件大小（字节）
  allowedTypes?: string[]; // 允许的文件类型
  compression?: boolean; // 是否压缩
  publicAccess?: boolean; // 是否公开访问
  folder?: string; // 上传到的文件夹
  expiresIn?: number; // 文件过期时间（秒）
  onProgress?: (progress: FileUploadProgress) => void;
  onSuccess?: (response: FileUploadResponse) => void;
  onError?: (error: FileUploadError) => void;
}

/**
 * 文件上传请求
 * 用途：发送到 API 的上传请求数据结构
 */
export interface FileUploadRequest {
  file: File;
  options?: FileUploadOptions;
}

/**
 * 🗑️ 文件删除相关类型
 */

/**
 * 文件删除请求
 * 用途：指定要删除的文件和相关选项
 */
export interface FileDeleteRequest {
  fileId: string;
  permanent?: boolean; // 是否永久删除（默认为软删除）
}

/**
 * 文件删除响应
 * 用途：返回文件删除操作的结果
 */
export interface FileDeleteResponse {
  success: boolean;
  fileId: string;
  message?: string;
  permanent?: boolean;
  deletedAt?: string;
}

/**
 * 📋 批量操作类型
 */

/**
 * 批量删除请求
 * 用途：一次删除多个文件
 */
export interface BatchDeleteRequest {
  fileIds: string[];
  permanent?: boolean;
}

/**
 * 批量删除响应
 * 用途：返回批量删除操作的详细结果
 */
export interface BatchDeleteResponse {
  success: boolean;
  totalRequested: number;
  deletedCount: number;
  failedCount: number;
  results?: Array<{
    fileId: string;
    success: boolean;
    error?: string;
  }>;
}

/**
 * 🔍 文件查询和信息类型
 */

/**
 * 文件基本信息
 * 用途：系统中文件的核心数据结构
 */
export interface FileInfo {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  updatedAt?: string;
  publicAccess: boolean;
  folder?: string;
  uploadedBy?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  status?: "ACTIVE" | "DELETED" | "ARCHIVED";
  thumbnailUrl?: string; // 缩略图 URL
  downloadCount?: number;
  lastAccessedAt?: string;
}

/**
 * 文件列表查询参数
 * 用途：分页查询和过滤文件列表的参数
 */
export interface FileListRequest {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "size" | "name" | "downloadCount";
  sortDirection?: "asc" | "desc";
  search?: string;
  type?: string; // 文件类型过滤
  folder?: string; // 文件夹过滤
  uploadedBy?: string; // 上传者过滤
  publicAccess?: boolean; // 访问权限过滤
  dateFrom?: string; // 开始日期
  dateTo?: string; // 结束日期
  minSize?: number; // 最小文件大小
  maxSize?: number; // 最大文件大小
}

/**
 * 📊 统计和分析类型
 */

/**
 * 文件系统统计信息
 * 用途：管理面板显示的存储使用情况
 */
export interface FileStats {
  totalFiles: number;
  totalSize: number;
  storageUsed: number;
  storageQuota: number;
  filesByType: Record<string, number>;
  filesByFolder: Record<string, number>;
  recentUploads: FileInfo[];
  uploadTrends: Array<{
    date: string;
    count: number;
    size: number;
  }>;
  popularFiles: Array<{
    file: FileInfo;
    downloadCount: number;
  }>;
}

/**
 * 📋 预签名上传类型（大文件上传）
 */

/**
 * 预签名 URL 请求
 * 用途：获取大文件上传的预签名 URL
 */
export interface PreSignedUrlRequest {
  filename: string;
  mimeType: string;
  size: number;
  publicAccess?: boolean;
  folder?: string;
  expiresIn?: number; // URL 过期时间（秒）
  checksum?: string; // 文件校验和
}

/**
 * 预签名 URL 响应
 * 用途：返回上传所需的 URL 和相关信息
 */
export interface PreSignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  fileId: string;
  expiresAt: string;
  headers?: Record<string, string>;
  maxFileSize?: number;
  allowedMethods?: string[];
}

/**
 * 🛠️ 文件操作和管理类型
 */

/**
 * 文件元数据更新请求
 * 用途：更新文件的元数据信息
 */
export interface FileMetadataUpdateRequest {
  filename?: string;
  publicAccess?: boolean;
  folder?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * 文件复制请求
 * 用途：复制文件到新位置
 */
export interface FileCopyRequest {
  fileId: string;
  newFilename?: string;
  targetFolder?: string;
  publicAccess?: boolean;
}

/**
 * 文件复制响应
 * 用途：返回复制操作的结果
 */
export interface FileCopyResponse {
  success: boolean;
  newFileId: string;
  newUrl: string;
  message?: string;
}

/**
 * 文件移动请求
 * 用途：移动文件到新位置
 */
export interface FileMoveRequest {
  fileId: string;
  targetFolder?: string;
  newFilename?: string;
}

/**
 * 文件移动响应
 * 用途：返回移动操作的结果
 */
export interface FileMoveResponse {
  success: boolean;
  message?: string;
  newUrl?: string;
}

/**
 * 🗂️ 文件夹管理类型
 */

/**
 * 文件夹信息
 * 用途：文件夹的基本信息结构
 */
export interface FolderInfo {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  createdAt: string;
  updatedAt?: string;
  publicAccess?: boolean;
  fileCount?: number;
  totalSize?: number;
  createdBy?: string;
}

/**
 * 创建文件夹请求
 * 用途：创建新文件夹
 */
export interface CreateFolderRequest {
  name: string;
  parentId?: string;
  publicAccess?: boolean;
}

/**
 * 🏷️ 标签管理类型
 */

/**
 * 文件标签
 * 用途：文件的标签信息
 */
export interface FileTag {
  id: string;
  name: string;
  color?: string;
  description?: string;
  usageCount?: number;
  createdAt: string;
}

/**
 * 📝 错误处理类型
 */

/**
 * 文件操作错误详情
 * 用途：统一的错误信息结构
 */
export interface FileUploadError {
  code: string;
  message: string;
  details?: any;
  field?: string; // 出错的字段
  statusCode?: number;
}

/**
 * ========================================
 * 🎯 类型别名和联合类型
 * ========================================
 */

/**
 * 文件类型枚举
 */
export type FileType =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "archive"
  | "other";

/**
 * 文件状态枚举
 */
export type FileStatus = "ACTIVE" | "DELETED" | "ARCHIVED";

/**
 * 排序字段枚举
 */
export type SortField =
  | "createdAt"
  | "updatedAt"
  | "size"
  | "name"
  | "downloadCount";

/**
 * ========================================
 * 🎯 工具类型
 * ========================================
 */

/**
 * 文件上传事件类型
 */
export type UploadEvent =
  | { type: "progress"; progress: FileUploadProgress }
  | { type: "success"; response: FileUploadResponse }
  | { type: "error"; error: FileUploadError }
  | { type: "complete" };

/**
 * 文件操作结果类型
 */
export type FileOperationResult<T = any> = {
  success: boolean;
  data?: T;
  error?: FileUploadError;
  message?: string;
};

/**
 * 搜索过滤器类型
 */
export interface FileSearchFilter {
  query?: string;
  type?: FileType;
  folder?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  sizeRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
  uploadedBy?: string;
}
