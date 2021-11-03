import { XLSXDTO } from '../../types/xlsx'

export const sumYearQuantities = (data: XLSXDTO[]) =>
  data.reduce((acc, curr) => acc + curr.quantity, 0)
