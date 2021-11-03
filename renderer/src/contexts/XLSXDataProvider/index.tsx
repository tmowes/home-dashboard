import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import xlsx from 'xlsx'

import { XLSXDTO } from '../../types/xlsx'
import { sumYearQuantities } from '../../utils/calculateXLSX/sumYearQuantities'
import { sumYearRevenue } from '../../utils/calculateXLSX/sumYearRevenue'
import { sumYearRevenueByPaymentMethod } from '../../utils/calculateXLSX/sumYearRevenueByPaymentMethod'
import { dataFilterByYear } from '../../utils/filterData/byYear'
import { XLSXDataContextData, XLSXDataProviderProps } from './types'

export const XLSXDataContext = createContext({} as XLSXDataContextData)

export const XLSXDataProvider = (props: XLSXDataProviderProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(2020)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [rawData, setRawData] = useState<XLSXDTO[]>([])
  const [dataYearly, setDataYearly] = useState<XLSXDTO[]>([])
  const [revenueYearly, setRevenueYearly] = useState(0)
  const [quantitiesYearly, setQuantitiesYearly] = useState(0)
  const [revenueByCreditCardYearly, setRevenueByCreditCardYearly] = useState(0)
  const [revenueByMoneyYearly, setRevenueByMoneyYearly] = useState(0)
  const [allProducts, setAllProducts] = useState<string[]>([])
  const [allYears, setAllYears] = useState<number[]>([])

  const loadXLSXData = useCallback(() => {
    console.log('loadXLSXData')
    const wb = xlsx.readFile('excel/base.xlsx', { cellDates: true })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const header = [
      'date',
      'product',
      'payment_method',
      'quantity',
      'price',
      'total',
    ]
    const data = xlsx.utils
      .sheet_to_json(ws, { header, range: 0, defval: '', raw: true })
      .filter((_, i) => i !== 0) as XLSXDTO[]
    setRawData(data)
    setAllYears([...new Set(data.map((item) => item.date.getFullYear()))])
    setAllProducts([...new Set(data.map((item) => item.product))])
  }, [])

  useEffect(() => {
    setDataYearly(dataFilterByYear(rawData, selectedYear, selectedProduct))
  }, [rawData, selectedProduct, selectedYear])

  useEffect(() => {
    console.time('Processing')
    setRevenueYearly(sumYearRevenue(dataYearly))
    setQuantitiesYearly(sumYearQuantities(dataYearly))
    setRevenueByCreditCardYearly(
      sumYearRevenueByPaymentMethod(dataYearly, 'CARTÃO DE CRÉDITO'),
    )
    setRevenueByMoneyYearly(
      sumYearRevenueByPaymentMethod(dataYearly, 'BOLETO BANCÁRIO'),
    )
    console.timeEnd('Processing')
  }, [dataYearly])

  useEffect(() => {
    loadXLSXData()
    setIsLoading(false)
  }, [loadXLSXData])

  // console.log({
  //   revenueYearly,
  //   quantitiesYearly,
  //   revenueByCreditCardYearly,
  //   revenueByMoneyYearly,
  //   selectedYear,
  // })

  // console.log(dataYearly)
  // console.log(allYears)

  const providerValues = {
    setSelectedProduct,
    selectedProduct,
    isLoading,
    revenueYearly,
    quantitiesYearly,
    revenueByCreditCardYearly,
    revenueByMoneyYearly,
    selectedYear,
    setSelectedYear,
    allYears,
    allProducts,
  }

  return (
    <XLSXDataContext.Provider value={providerValues}>
      {children}
    </XLSXDataContext.Provider>
  )
}

export function useXLSXData(): XLSXDataContextData {
  const context = useContext(XLSXDataContext)
  if (!context) {
    throw new Error('useXLSXData must be used within a XLSXDataProvider')
  }
  return context
}
