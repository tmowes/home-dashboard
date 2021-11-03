import { XLSXDTO } from '../../types/xlsx'

export const sumYearRevenue = (data: XLSXDTO[]) =>
  data.reduce((acc, curr) => acc + curr.total, 0)
