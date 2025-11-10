import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Page, ResultResponse } from "@/types";

import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "../utils/base-query";

const transformErrorResponse = (error: FetchBaseQueryError) => {
  if (error.status === "PARSING_ERROR" && error.originalStatus) {
    return {
      status: error.originalStatus,
      message:
        (error.data as { message?: string })?.message ||
        "Response parsing error",
      data: error.data,
    };
  }

  if (error.status === "TIMEOUT_ERROR") {
    return {
      status: 408,
      message: "Request timeout. Please try again.",
    };
  }

  if (error.status === "FETCH_ERROR") {
    return {
      status: 0,
      message: "Network error. Please check your connection.",
    };
  }

  return {
    status: error.status as number,
    message:
      (error.data as { message?: string })?.message || "An error occurred",
    data: error.data,
  };
};

// Tag interface matching backend TagVO
export interface Tag {
  /** Tag ID */
  tid?: string;

  /** Tag name */
  name: string;

  /** Tag slug (URL-friendly identifier) */
  slug?: string;

  /** Tag icon (emoji or icon identifier) */
  icon?: string;

  /** Tag color (hex color code) */
  color?: string;

  /** Tag description */
  description?: string;

  /** Creation timestamp */
  createdAt?: string;

  /** Update timestamp */
  updatedAt?: string;
}

export const tagApi = createApi({
  reducerPath: "tag-api",

  tagTypes: ["Tag", "Tags"],

  baseQuery: createBaseQuery({
    baseUrl: "/api/tag",
  }),

  // Global configuration for cache invalidation and behavior
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if arg changes or 30 seconds old
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    /**
     * ✓
     * Create a new tag.
     * @param tag - Tag data for creation
     * @returns Created tag entity
     */
    createTag: build.mutation<
      Tag,
      {
        name: string;
        slug: string;
        icon: string;
        color?: string;
        description?: string;
      }
    >({
      query: (tag) => ({
        url: "/create",
        method: "POST",
        body: tag,
      }),

      invalidatesTags: ["Tags", { type: "Tag", id: "LIST" }],

      transformResponse(response: ResultResponse<Tag>) {
        if (response.code === 4004) {
          const { data } = response;

          if (!data) {
            alert("Invalid tag creation response");

            throw new Error("Invalid tag creation response");
          }

          return data;
        }

        alert(response.message || "Tag creation failed");

        throw new Error(response.message || "Tag creation failed");
      },

      transformErrorResponse,
    }),

    /**
     * ✓
     * Update an existing tag.
     * @param tag - Tag data with ID for update
     * @returns Updated tag entity
     */
    updateTag: build.mutation<
      Tag,
      {
        tid: string;
        name: string;
        slug: string;
        icon: string;
        color: string;
        description: string;
      }
    >({
      query: (tag) => ({
        url: `/${tag.tid}`,
        method: "PUT",
        body: tag,
      }),

      transformResponse(response: ResultResponse<Tag>) {
        if (response.code === 4006) {
          const { data } = response;

          if (!data) {
            alert("Invalid tag update response");

            throw Error("Invalid response");
          }

          alert("Tag updated successfully");

          return data;
        }

        alert(response.message || "Tag update failed");

        throw Error(response.message || "Tag update failed");
      },

      transformErrorResponse,

      invalidatesTags: (result, error, { tid }) => [
        { type: "Tag", id: tid },
        { type: "Tag", id: "LIST" },
      ],
    }),

    /**
     * Delete a tag.
     * @param tagId - Tag ID to delete
     * @returns void
     */
    deleteTag: build.mutation<void, string>({
      query: (tagId) => ({
        url: `/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, tagId) => [
        { type: "Tag", id: tagId },
        "Tags",
      ],
    }),

    getTags: build.query<Page<Tag>, { page?: number; size?: number }>({
      query: ({ page = 1, size = 5 }) => ({
        url: "",
        method: "GET",
        params: {
          page,
          size,
        },
      }),

      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map(({ tid }) => ({
                type: "Tag" as const,
                id: tid,
              })),
              { type: "Tag" as const, id: "LIST" },
            ]
          : [{ type: "Tag" as const, id: "LIST" }],

      transformResponse(response: ResultResponse<Page<Tag>>) {
        if (response.code === 200) {
          const { data } = response;

          if (!data) {
            alert("Invalid tags response");

            throw new Error("Invalid tag response");
          }

          return data;
        }

        alert("");

        throw new Error("");
      },

      transformErrorResponse,
    }),
  }),
});

export const {
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useGetTagsQuery,
} = tagApi;
