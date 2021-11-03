import { ReactNode } from 'react'

export type StaticDataContextData = {
  isLoading: boolean
  items: SelectProps[]
}

export type StaticDataProviderProps = {
  children: ReactNode
}

export type SelectProps = {
  id: string
  label: string
}
