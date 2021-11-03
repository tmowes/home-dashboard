import Storage from '../AsyncStorage'
import { storageKey } from '../storageKey'
import { calculateTimeLeft } from '../../utils/calculateAppointment'
import { StorageDTO, StorageProps } from './types'

const AsyncStorage = new Storage()

export const saveAppointment = async (appointment: StorageDTO) => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:appointments`)
    const prev = data ? (JSON.parse(data) as StorageProps) : {}

    const newAppointment = { [appointment.id]: { data: appointment } }

    const allAppointments = { ...newAppointment, ...prev }

    const sortedAppointments = Object.keys(allAppointments)
      .map((appoint) => ({
        ...allAppointments[appoint].data,
        time_left: calculateTimeLeft(allAppointments[appoint]?.data?.date),
      }))
      .sort(
        (a: StorageDTO, b: StorageDTO) =>
          Math.floor(a.time_left) - Math.floor(b.time_left),
      )

    const parsedAppointments = sortedAppointments.map(
      (appoint: StorageDTO) => ({ [appoint.id]: { data: appoint } }),
    )

    const storageAppointments = Object.assign({}, ...parsedAppointments)

    await AsyncStorage.setItem(
      `${storageKey}:appointments`,
      JSON.stringify(storageAppointments, null, 2),
    )

    return sortedAppointments
  } catch (err) {
    throw new Error(err)
  }
}

export const loadAppointments = async () => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:appointments`)
    const appointments = data ? (JSON.parse(data) as StorageProps) : {}

    return Object.keys(appointments)
      .map((appointment) => ({
        ...appointments[appointment].data,
        time_left: calculateTimeLeft(appointments[appointment]?.data?.date),
      }))
      .sort(
        (a: StorageDTO, b: StorageDTO) =>
          Math.floor(a.time_left) - Math.floor(b.time_left),
      )
  } catch (err) {
    throw new Error(err)
  }
}

export const updateAppointment = async (
  id: string,
  appointment: StorageDTO,
) => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:appointments`)
    const prev = data ? (JSON.parse(data) as StorageProps) : {}

    delete prev[id]

    const updatedOperation = { [appointment.id]: { data: appointment } }

    const allAppointments = { ...updatedOperation, ...prev }

    const sortedAppointments = Object.keys(allAppointments)
      .map((appoint) => ({
        ...allAppointments[appoint].data,
        time_left: calculateTimeLeft(allAppointments[appoint]?.data?.date),
      }))
      .sort(
        (a: StorageDTO, b: StorageDTO) =>
          Math.floor(a.time_left) - Math.floor(b.time_left),
      )

    const parsedAppointments = sortedAppointments.map(
      (appoint: StorageDTO) => ({ [appoint.id]: { data: appoint } }),
    )

    const storageAppointments = Object.assign({}, ...parsedAppointments)

    await AsyncStorage.setItem(
      `${storageKey}:appointments`,
      JSON.stringify(storageAppointments, null, 2),
    )

    return sortedAppointments
  } catch (err) {
    throw new Error(err)
  }
}

export const removeAppointment = async (id: string) => {
  try {
    const data = await AsyncStorage.getItem(`${storageKey}:appointments`)
    const prev = data ? (JSON.parse(data) as StorageProps) : {}

    delete prev[id]

    await AsyncStorage.setItem(
      `${storageKey}:appointments`,
      JSON.stringify({ ...prev }, null, 2),
    )
  } catch (err) {
    throw new Error(err)
  }
}
