import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { useRenderClient } from '@/hooks/useRenderClient'

import { TypeMaterialIconName } from '@/shared/types/icon.types'

export const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
  const { isRenderClient } = useRenderClient()
  const IconComponent = MaterialIcons[name]
  if (isRenderClient) {
    return <IconComponent /> || <MaterialIcons.Md10K />
  } else return null
}
