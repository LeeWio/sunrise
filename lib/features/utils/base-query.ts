import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { retry } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/lib/store'

interface CreateBaseQueryOptions {
  baseUrl: string
  maxRetries?: number
}

export const createBaseQuery = ({
  baseUrl,
  maxRetries = 3,
}: CreateBaseQueryOptions) =>
  retry(
    fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        // 先假设
        const { auth } = getState()

        if (auth.isAuthenticated && auth.userDetail?.authorization) {
          headers.set('Authorization', auth.userDetail.authorization)
        }

        // 可选：添加 Content-Type 或其他通用 headers
        headers.set('Content-Type', 'application/json')

        return headers
      },
      // 可选：添加全局错误处理（如 token 过期跳转登录）
      // 可通过 `validateStatus` 或在 `transformErrorResponse` 中处理
    }),
    {
      maxRetries,
    }
  )
