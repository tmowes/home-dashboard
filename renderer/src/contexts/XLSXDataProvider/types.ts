import { Dispatch, ReactNode, SetStateAction } from 'react'

export type XLSXDataContextData = {
  isLoading: boolean
  revenueYearly: number
  quantitiesYearly: number
  revenueByCreditCardYearly: number
  revenueByMoneyYearly: number
  selectedYear: number
  selectedProduct: string
  setSelectedYear: Dispatch<SetStateAction<number>>
  setSelectedProduct: Dispatch<SetStateAction<string>>
  allYears: number[]
  allProducts: string[]
}

export type XLSXDataProviderProps = {
  children: ReactNode
}

export type SelectProps = {
  id: string
  label: string
}
