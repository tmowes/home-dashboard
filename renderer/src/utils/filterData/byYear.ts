import { XLSXDTO } from '../../types/xlsx'

export const dataFilterByYear = (
  data: XLSXDTO[],
  year: number,
  product = 'PRODUTO A',
) =>
  data
    .filter((d) => d.date.getFullYear() === year)
    .filter((n) => n.product === product)
