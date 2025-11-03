import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ResultResponse, Page } from "../../../types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

import {
  FileUploadRequest,
  FileDeleteRequest,
  FileDeleteResponse,
  FileInfo,
  FileListRequest,
  FileUploadResponse,
  BatchDeleteRequest,
  BatchDeleteResponse,
  PreSignedUrlRequest,
  PreSignedUrlResponse,
  FileStats,
  FileMetadataUpdateRequest,
} from "./types";

export const fileApi = createApi({
  reducerPath: "file-api",
  tagTypes: ["File", "Files", "UploadProgress"],

  baseQuery: createBaseQuery({
    baseUrl: "/api/file",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 300, // Keep unused data for 5 minutes
  refetchOnMountOrArgChange: 60, // Refetch if arg changes or 1 minute old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * Upload single file
     */
    uploadFile: build.mutation<FileUploadResponse, FileUploadRequest>({
      query: ({ file, options }) => {
        const formData = new FormData();

        formData.append("file", file);

        if (options) {
          if (options.maxSize) {
            formData.append("maxSize", options.maxSize.toString());
          }
          if (options.allowedTypes) {
            formData.append(
              "allowedTypes",
              JSON.stringify(options.allowedTypes),
            );
          }
          if (options.compression) {
            formData.append("compression", options.compression.toString());
          }
          if (options.publicAccess !== undefined) {
            formData.append("publicAccess", options.publicAccess.toString());
          }
        }

        return {
          url: "/upload",
          method: "POST",
          body: formData,
          formData: true,
        };
      },

      transformResponse: (response: ResultResponse<FileUploadResponse>) => {
        if (response.code === 7005) {
          const { data } = response;

          if (!data) {
            throw new Error("Invalid response");
          }

          return data;
        }

        throw new Error(response.message || "File upload failed");
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "File upload response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "File upload timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error during file upload. Please check your connection.",
          };
        }

        if (error.status === 413) {
          return {
            status: 413,
            message: "The file is too large to upload",
          };
        }

        if (error.status === 415) {
          return {
            status: 415,
            message: "Unsupported file type for upload",
          };
        }

        if (error.status === 422) {
          return {
            status: 422,
            message: "Invalid file format or corrupted data",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "File upload failed",
          data: error.data,
        };
      },
      invalidatesTags: ["Files", { type: "File", id: "LIST" }],

      // Optimistic update for upload progress
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Upload completed successfully
        } catch (error) {
          // Upload failed - could show toast notification
          console.error("File upload failed:", error);
        }
      },
    }),

    /**
     * Upload file using pre-signed URL (for large files)
     */
    uploadWithPreSignedUrl: build.mutation<
      PreSignedUrlResponse,
      PreSignedUrlRequest
    >({
      query: (request) => ({
        url: "/presigned-url",
        method: "POST",
        body: request,
      }),

      transformResponse: (response: ResultResponse<PreSignedUrlResponse>) => {
        if (response.code >= 200 && response.code < 300) {
          return response.data as PreSignedUrlResponse;
        }
        throw new Error(
          response.message || "Failed to generate pre-signed URL",
        );
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "Pre-signed URL response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "Pre-signed URL generation timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error while generating pre-signed URL. Please check your connection.",
          };
        }

        if (error.status === 400) {
          return {
            status: 400,
            message: "Invalid request for pre-signed URL generation",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied for pre-signed URL generation",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "Failed to generate pre-signed URL",
          data: error.data,
        };
      },
    }),

    /**
     * Delete single file
     */
    deleteFile: build.mutation<FileDeleteResponse, FileDeleteRequest>({
      query: ({ fileId, permanent = false }) => ({
        url: permanent ? `/${fileId}/permanent` : `/${fileId}`,
        method: "DELETE",
      }),

      transformResponse: (response: ResultResponse<FileDeleteResponse>) => {
        if (response.code >= 200 && response.code < 300) {
          return response.data as FileDeleteResponse;
        }
        throw new Error(response.message || "File deletion failed");
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "File deletion response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "File deletion timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error during file deletion. Please check your connection.",
          };
        }

        if (error.status === 404) {
          return {
            status: 404,
            message: "File not found or already deleted",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied for file deletion",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "File deletion failed",
          data: error.data,
        };
      },
      invalidatesTags: (result, error, { fileId }) => [
        { type: "File", id: fileId },
        "Files",
        { type: "File", id: "LIST" },
      ],

      // Optimistic update for deletion
      onQueryStarted: async ({ fileId }, { dispatch, queryFulfilled }) => {
        // Optimistically remove file from cache
        const patchResult = dispatch(
          fileApi.util.updateQueryData("getFileList", {}, (draft) => {
            if (draft && draft.content) {
              draft.content = draft.content.filter(
                (file) => file.id !== fileId,
              );
              draft.totalElements = Math.max(0, (draft.totalElements || 0) - 1);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          patchResult.undo();
        }
      },
    }),

    /**
     * Batch delete files
     */
    batchDeleteFiles: build.mutation<BatchDeleteResponse, BatchDeleteRequest>({
      query: ({ fileIds, permanent = false }) => ({
        url: permanent ? "/batch/permanent" : "/batch",
        method: "DELETE",
        body: { fileIds },
      }),

      transformResponse: (response: ResultResponse<BatchDeleteResponse>) => {
        if (response.code >= 200 && response.code < 300) {
          return response.data as BatchDeleteResponse;
        }
        throw new Error(response.message || "Batch file deletion failed");
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "Batch deletion response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "Batch file deletion timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error during batch file deletion. Please check your connection.",
          };
        }

        if (error.status === 400) {
          return {
            status: 400,
            message: "Invalid request for batch file deletion",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied for batch file deletion",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "Batch file deletion failed",
          data: error.data,
        };
      },
      invalidatesTags: ["Files", { type: "File", id: "LIST" }],
    }),

    /**
     * Get single file information
     */
    getFile: build.query<FileInfo, string>({
      query: (fileId) => `/${fileId}`,

      transformResponse: (response: ResultResponse<FileInfo>) => {
        if (response.code >= 200 && response.code < 300) {
          return response.data as FileInfo;
        }
        throw new Error(
          response.message || "Failed to retrieve file information",
        );
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "File information response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "File information retrieval timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error while retrieving file information. Please check your connection.",
          };
        }

        if (error.status === 404) {
          return {
            status: 404,
            message: "File not found",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied to access file",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "Failed to retrieve file information",
          data: error.data,
        };
      },
      providesTags: (result, error, fileId) => [{ type: "File", id: fileId }],
    }),

    /**
     * Get paginated file list
     */
    getFileList: build.query<Page<FileInfo>, FileListRequest>({
      query: ({
        page = 1,
        limit = 20,
        sortBy = "createdAt",
        sortDirection = "desc",
        search,
        type,
        folder,
        uploadedBy,
        dateFrom,
        dateTo,
      }) => ({
        url: "/list",
        params: {
          page,
          limit,
          sortBy,
          sortDirection,
          search,
          type,
          folder,
          uploadedBy,
          dateFrom,
          dateTo,
        },
      }),

      transformResponse: (response: ResultResponse<Page<FileInfo>>) => {
        if (response.code >= 200 && response.code < 300) {
          const data = response.data as Page<FileInfo>;

          return {
            ...data,
            content: data.content || [],
            totalElements: data.totalElements || 0,
            totalPages: data.totalPages || 0,
            size: data.size || 20,
            number: data.number || 0,
          };
        }
        throw new Error(response.message || "Failed to retrieve file list");
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "File list response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "File list retrieval timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error while retrieving file list. Please check your connection.",
          };
        }

        if (error.status === 400) {
          return {
            status: 400,
            message: "Invalid request parameters for file list",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied to access file list",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "Failed to retrieve file list",
          data: error.data,
        };
      },
      providesTags: ["Files", { type: "File", id: "LIST" }],
    }),

    /**
     * Get file statistics
     */
    getFileStats: build.query<FileStats, void>({
      query: () => "/stats",

      transformResponse: (response: ResultResponse<FileStats>) => {
        if (response.code >= 200 && response.code < 300) {
          return response.data as FileStats;
        }
        throw new Error(
          response.message || "Failed to retrieve file statistics",
        );
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "File statistics response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "File statistics retrieval timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error while retrieving file statistics. Please check your connection.",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied to access file statistics",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "Failed to retrieve file statistics",
          data: error.data,
        };
      },
      providesTags: ["Files"],
    }),

    /**
     * Update file metadata
     */
    updateFileMetadata: build.mutation<
      FileInfo,
      { fileId: string; metadata: FileMetadataUpdateRequest }
    >({
      query: ({ fileId, metadata }) => ({
        url: `/${fileId}/metadata`,
        method: "PUT",
        body: metadata,
      }),

      transformResponse: (response: ResultResponse<FileInfo>) => {
        if (response.code >= 200 && response.code < 300) {
          return response.data as FileInfo;
        }
        throw new Error(response.message || "Failed to update file metadata");
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        if (error.status === "PARSING_ERROR" && error.originalStatus) {
          return {
            status: error.originalStatus,
            message:
              (error.data as { message?: string })?.message ||
              "File metadata update response parsing error",
            data: error.data,
          };
        }

        if (error.status === "TIMEOUT_ERROR") {
          return {
            status: 408,
            message: "File metadata update timeout. Please try again.",
          };
        }

        if (error.status === "FETCH_ERROR") {
          return {
            status: 0,
            message:
              "Network error while updating file metadata. Please check your connection.",
          };
        }

        if (error.status === 400) {
          return {
            status: 400,
            message: "Invalid metadata update request",
          };
        }

        if (error.status === 404) {
          return {
            status: 404,
            message: "File not found for metadata update",
          };
        }

        if (error.status === 403) {
          return {
            status: 403,
            message: "Permission denied to update file metadata",
          };
        }

        return {
          status: error.status as number,
          message:
            (error.data as { message?: string })?.message ||
            "Failed to update file metadata",
          data: error.data,
        };
      },
      invalidatesTags: (result, error, { fileId }) => [
        { type: "File", id: fileId },
      ],
    }),
  }),
});

// Export hooks for all endpoints
export const {
  useUploadFileMutation,
  useUploadWithPreSignedUrlMutation,
  useDeleteFileMutation,
  useBatchDeleteFilesMutation,
  useGetFileQuery,
  useGetFileListQuery,
  useGetFileStatsQuery,
  useUpdateFileMetadataMutation,
} = fileApi;
