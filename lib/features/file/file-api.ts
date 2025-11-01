import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";
import { ResultResponse } from "../../../types";

import {
  FileUploadRequest,
  FileDeleteResponse,
  FileInfo,
  FileListResponse,
  FileUploadResponse,
} from "./types";

export const fileApi = createApi({
  reducerPath: "file-api",
  tagTypes: ["File"],

  baseQuery: createBaseQuery({
    baseUrl: "/api/file",
  }),

  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
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
        }

        return {
          url: "/upload",
          method: "POST",
          body: formData,
          formData: true,
        };
      },

      invalidatesTags: [{ type: "File", id: "LIST" }],

      transformResponse: (response: ResultResponse<FileUploadResponse>) => {
        if (response.code === 200) {
          const { data } = response;

          if (!data || !data.url) {
            alert("Invalid upload response format");

            return {} as FileUploadResponse;
          }

          return data;
        } else {
          alert(response.message);

          return {} as FileUploadResponse;
        }
      },

      transformErrorResponse: (error) => {
        if (error.status === 413) {
          return {
            message: "The file is too large to upload",
            status: error.status,
          };
        } else if (error.status === 415) {
          return {
            message: "Unsupported file type",
            status: error.status,
          };
        } else {
          return {
            message: "An error occurred during upload",
            status: error.status,
          };
        }
      },

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          alert(`Upload successful ${data.filename}`);
        } catch (error) {
          alert(`Upload failed: ${error}`);
        }
      },
    }),

    deleteFile: build.mutation<ResultResponse<FileDeleteResponse>, string>({
      query: (fileId) => ({
        url: `/${fileId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "File", id: "LIST" }],
    }),

    getFile: build.query<ResultResponse<FileInfo>, string>({
      query: (fileId) => ({
        url: `/${fileId}`,
        method: "GET",
      }),
      providesTags: (result, error, fileId) => [{ type: "File", id: fileId }],
    }),

    getFileList: build.query<
      ResultResponse<FileListResponse>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/list",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [{ type: "File", id: "LIST" }],
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
