import { calculateDelta } from './delta'

export const calculateParcial = (loss: string, buy: string) =>
  (calculateDelta(loss, buy) + Number(buy)).toFixed(2)
