import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { Layout } from '@/components/layout/Layout'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { store } from '@/store/store'

import { AuthProvider } from './AuthProvider/AuthProvider'
import { HeadProvider } from './HeadProvider/HeadProvider'
import { Toastify } from './Toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const MainProvider: FC<TypeComponentAuthFields> = ({
  children,
  Component,
}) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toastify />
          <AuthProvider Component={Component}>
            <Layout>{children}</Layout>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}
