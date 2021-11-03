import { ReactNode } from 'react'

import Storage from '../../libs/AsyncStorage'

export type AppProviderProps = {
  children: ReactNode
}

export type AppContextData = {
  AsyncStorage: Storage
}
