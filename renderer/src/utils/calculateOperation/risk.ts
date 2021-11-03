export const calculateOperationRisk = (loss: string, buy: string) =>
  `${((Number(loss) / Number(buy) - 1) * -100).toFixed(2)}%`
