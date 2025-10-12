import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query'

import { RootState } from '@/app/store'

export const articleApi = createApi({
  reducerPath: 'article-api',
  tagTypes: ['aritlce'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/article',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState

      // Add authorization token to headers if user is authenticated
      if (auth.isAuthenticated && auth.userDetail?.authorization) {
        headers.set('Authorization', auth.userDetail.authorization)
      }

      return headers
    },
  }),

  endpoints: build => ({}),
})
