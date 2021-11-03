export type PaymentType = 'BOLETO BANCÁRIO' | 'CARTÃO DE CRÉDITO'

export type XLSXDTO = {
  date: Date
  product: string
  payment_method: PaymentType
  quantity: number
  price: number
  total: number
}
