export const convertToCurrency = (text: string) =>
  Number(text).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
