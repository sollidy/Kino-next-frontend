import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/user.service'

import { convertMongoDate } from '@/utils/date/convertMongoDate'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const queryData = useQuery(
    ['user list', debouncedSearch],
    () => UserService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (user): ITableItem => ({
            _id: user._id,
            editUrl: getAdminUrl(`user/edit/${user._id}`),
            items: [user.email, convertMongoDate(user.createdAt)],
          })
        ),
      onError: (error) => {
        toastError(error, 'User list')
      },
    }
  )
  const { mutateAsync: deleteAsync } = useMutation(
    ['delete user', debouncedSearch],
    (userId: string) => UserService.delete(userId),
    {
      onError: (error) => {
        toastError(error, 'Delete user')
      },
      onSuccess: () => {
        toast.success('Success delete user')
        queryData.refetch()
      },
    }
  )
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
    }),
    [queryData, searchTerm, deleteAsync]
  )
}
