import { calculateDelta } from './delta'

export const calculateFinal = (loss: string, buy: string) =>
  (calculateDelta(loss, buy) * 2.99 + Number(buy)).toFixed(2)
