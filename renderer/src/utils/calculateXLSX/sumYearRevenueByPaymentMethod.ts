import { PaymentType, XLSXDTO } from '../../types/xlsx'

export const sumYearRevenueByPaymentMethod = (
  data: XLSXDTO[],
  method: PaymentType,
) =>
  data
    .filter((pay) => pay.payment_method === method)
    .reduce((acc, curr) => acc + curr.total, 0)
