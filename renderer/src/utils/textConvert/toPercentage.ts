export const convertToPercentage = (text: string) =>
  `${Number(text.replace('%', '')).toLocaleString('pt-BR')} %`
