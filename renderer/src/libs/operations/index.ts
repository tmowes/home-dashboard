import Storage from '../AsyncStorage'
import { storageKey } from '../storageKey'
import { StorageDTO, StorageProps } from './types'

const AsyncStorage = new Storage()

export const saveOperation = async (operation: StorageDTO) => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:operations`)
    const prev = data ? (JSON.parse(data) as StorageProps) : {}

    const newOperation = { [operation.id]: { data: operation } }

    const allOperations = { ...newOperation, ...prev }

    const sortedOperations = Object.keys(allOperations)
      .map((oper) => ({ ...allOperations[oper].data }))
      .sort((a: StorageDTO, b: StorageDTO) => a.ticker.localeCompare(b.ticker))

    const parsedOperations = sortedOperations.map((oper: StorageDTO) => ({
      [oper.id]: { data: oper },
    }))

    const storageOperations = Object.assign({}, ...parsedOperations)

    await AsyncStorage.setItem(
      `${storageKey}:operations`,
      JSON.stringify(storageOperations, null, 2),
    )

    return sortedOperations
  } catch (err) {
    throw new Error(err)
  }
}

export const loadOperations = async () => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:operations`)
    const operations = data ? (JSON.parse(data) as StorageProps) : {}
    return Object.keys(operations)
      .map((operation) => ({ ...operations[operation].data }))
      .sort((a: StorageDTO, b: StorageDTO) => a.ticker.localeCompare(b.ticker))
  } catch (err) {
    throw new Error(err)
  }
}

export const updateOperation = async (id: string, operation: StorageDTO) => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:operations`)
    const prev = data ? (JSON.parse(data) as StorageProps) : {}

    delete prev[id]

    const updatedOperation = { [operation.id]: { data: operation } }

    const allOperations = { ...updatedOperation, ...prev }

    const sortedOperations = Object.keys(allOperations)
      .map((oper) => ({ ...allOperations[oper].data }))
      .sort((a: StorageDTO, b: StorageDTO) => a.ticker.localeCompare(b.ticker))

    const parsedOperations = sortedOperations.map((oper: StorageDTO) => ({
      [oper.id]: { data: oper },
    }))

    const storageOperations = Object.assign({}, ...parsedOperations)

    await AsyncStorage.setItem(
      `${storageKey}:operations`,
      JSON.stringify(storageOperations, null, 2),
    )

    return sortedOperations
  } catch (err) {
    throw new Error(err)
  }
}

export const removeOperation = async (id: string) => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:operations`)
    const prev = data ? (JSON.parse(data) as StorageProps) : {}

    delete prev[id]

    await AsyncStorage.setItem(
      `${storageKey}:operations`,
      JSON.stringify({ ...prev }, null, 2),
    )
  } catch (err) {
    throw new Error(err)
  }
}
