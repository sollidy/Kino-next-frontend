import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'
import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { push } = useRouter()
  const queryData = useQuery(
    ['movie list', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (movie): ITableItem => ({
            _id: movie._id,
            editUrl: getAdminUrl(`movie/edit/${movie._id}`),
            items: [
              movie.title,
              getGenresList(movie.genres),
              String(movie.rating),
            ],
          })
        ),
      onError: (error) => {
        toastError(error, 'Movie list')
      },
    }
  )
  const { mutateAsync: deleteAsync } = useMutation(
    'delete movie',
    (movieId: string) => MovieService.delete(movieId),
    {
      onError: (error) => {
        toastError(error, 'Delete movie')
      },
      onSuccess: () => {
        toast.success('Success delete movie')
        queryData.refetch()
      },
    }
  )
  const { mutateAsync: createAsync } = useMutation(
    'create movie',
    () => MovieService.create(),
    {
      onError: (error) => {
        toastError(error, 'Create movie')
      },
      onSuccess: ({ data: _id }) => {
        toast.success('Success create movie')
        push(`movie/edit/${_id}`)
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
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync]
  )
}
