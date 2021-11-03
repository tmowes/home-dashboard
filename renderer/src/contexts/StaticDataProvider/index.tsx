import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  SelectProps,
  StaticDataContextData,
  StaticDataProviderProps,
} from './types'

export const StaticDataContext = createContext({} as StaticDataContextData)

export const StaticDataProvider = (props: StaticDataProviderProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<SelectProps[]>([])

  const loadStaticData = useCallback(() => {
    setItems([])
  }, [])

  useEffect(() => {
    loadStaticData()
    setIsLoading(false)
  }, [loadStaticData])

  const providerValues = {
    isLoading,
    items,
  }

  return (
    <StaticDataContext.Provider value={providerValues}>
      {children}
    </StaticDataContext.Provider>
  )
}

export function useStaticData(): StaticDataContextData {
  const context = useContext(StaticDataContext)
  if (!context) {
    throw new Error('useStaticData must be used within a StaticDataProvider')
  }
  return context
}
