export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

export interface FileUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUploadError {
  code: string;
  message: string;
  details?: any;
}

export interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  onProgress?: (progress: FileUploadProgress) => void;
  onSuccess?: (response: FileUploadResponse) => void;
  onError?: (error: FileUploadError) => void;
}

export interface FileUploadRequest {
  file: File;
  options?: FileUploadOptions;
}

export interface FileDeleteResponse {
  success: boolean;
  message?: string;
}

export interface FileInfo {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  metadata?: Record<string, any>;
}

export interface FileListResponse {
  files: FileInfo[];
  total: number;
  page: number;
  limit: number;
}
