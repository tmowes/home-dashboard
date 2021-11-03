import { useCallback, useEffect, useMemo } from 'react'

import { AppointmentsProvider } from '../AppointmentsProvider'
import { StaticDataProvider } from '../StaticDataProvider'
import { AppProviderProps } from './types'
import Storage from '../../libs/AsyncStorage'
import { XLSXDataProvider } from '../XLSXDataProvider'

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props

  const AsyncStorage = useMemo(() => new Storage(), [])

  const initStorage = useCallback(async () => {
    await AsyncStorage.createStorage()
  }, [AsyncStorage])

  useEffect(() => {
    initStorage()
  }, [initStorage])

  return (
    <StaticDataProvider>
      <XLSXDataProvider>
        <AppointmentsProvider>{children}</AppointmentsProvider>
      </XLSXDataProvider>
    </StaticDataProvider>
  )
}
