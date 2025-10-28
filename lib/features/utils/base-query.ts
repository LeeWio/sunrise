import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { retry } from "@reduxjs/toolkit/query/react";

import { RootState } from "@/lib/store";

interface CreateBaseQueryOptions {
  baseUrl: string;
  maxRetries?: number;
}

export const createBaseQuery = ({
  baseUrl,
  maxRetries = 3,
}: CreateBaseQueryOptions) =>
  retry(
    fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        // Get user state with proper typing
        const { user } = getState() as RootState;

        if (user?.isAuthenticated && user?.token) {
          headers.set("Authorization", `Bearer ${user.token}`);
        }

        // 可选：添加 Content-Type 或其他通用 headers
        headers.set("Content-Type", "application/json");

        return headers;
      },
      // 可选：添加全局错误处理（如 token 过期跳转登录）
      // 可通过 `validateStatus` 或在 `transformErrorResponse` 中处理
    }),
    {
      maxRetries,
    },
  );
