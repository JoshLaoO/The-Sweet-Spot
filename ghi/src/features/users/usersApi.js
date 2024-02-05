import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/users/'}),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (userId) => `${userId}`,
        }),
    }),
})
export const { useGetUserByIdQuery } = userApi;
