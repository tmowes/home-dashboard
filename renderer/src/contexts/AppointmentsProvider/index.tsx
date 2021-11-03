import { createContext, useContext, useEffect, useState } from 'react'

import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import addHours from 'date-fns/addHours'
import addMinutes from 'date-fns/addMinutes'
import subHours from 'date-fns/subHours'

import {
  AppointmentsContextData,
  AppointmentDTO,
  AppointmentsProps,
  AppointmentsProviderProps,
  OperationDTO,
  OperationProps,
} from './types'
import { getRelativeDateFromNow } from '../../utils/getRelativeDateFromNow'
import {
  loadAppointments,
  removeAppointment,
  saveAppointment,
} from '../../libs/appointments'
import {
  loadOperations,
  removeOperation,
  saveOperation,
  updateOperation,
} from '../../libs/operations'
import {
  calculateFinal,
  calculateOperationRisk,
  calculateParcial,
} from '../../utils/calculateOperation'

export const AppointmentsContext = createContext({} as AppointmentsContextData)

export const AppointmentsProvider = (props: AppointmentsProviderProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [shouldUpdate, setShouldUpdate] = useState(true)

  const [appointments, setAppointments] = useState<AppointmentsProps[]>([])
  const [operations, setOperations] = useState<OperationProps[]>([])
  const [editingOper, setEditingOper] = useState({
    ticker: '',
    targetBuy: '',
    targetLoss: '',
  } as OperationProps)
  const [appointmentsList, setAppointmentsList] = useState<AppointmentsProps[]>(
    [],
  )
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentsProps>({} as AppointmentsProps)

  const appointmentSelection = (id: string) => {
    const appointment = appointmentsList.find((a) => a.id === id)
    if (appointment) {
      setSelectedAppointment(appointment)
      return appointment
    }
    return appointment
  }

  const saveNewAppointment = async (appointment: AppointmentDTO) => {
    console.log({ appointment })
    const dateNow = new Date().getTime()
    const {
      title,
      about,
      location,
      date,
      time,
      full_day,
      notifications,
      dateTimeNotification,
    } = appointment

    const full_date_time = addHours(
      addMinutes(parseISO(date), Number(time?.split(':')[1] || 0)),
      Number(time?.split(':')[0] || 0),
    )

    const date_calendar_format = format(parseISO(date), 'yyyy-MM-dd')

    const day_month_date = format(parseISO(date), 'dd/MM')

    const time_left = full_date_time.getTime() - dateNow

    const dateString = JSON.parse(JSON.stringify(full_date_time))

    const notificationTime = subHours(parseISO(dateString), 1)

    const relativity_date = getRelativeDateFromNow(dateString, notificationTime)

    // const notificationID = await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: '💬 Aviso de evento',
    //     body: `🍻${relativity_date} será o ${title},📍:${location}, ⏰:${time}`,
    //     sound: true,
    //     priority: Notifications.AndroidNotificationPriority.MAX,
    //     data: {
    //       appointment,
    //     },
    //   },
    //   trigger: {
    //     date: notificationTime.getTime() / 1000,
    //   },
    // })

    const data: AppointmentsProps = {
      id: String(new Date().getTime()),
      title,
      about,
      location,
      date: date_calendar_format,
      day_month_date,
      full_date_time: dateString,
      time,
      full_day,
      time_left,
      notifications,
      relativity_date,
      dateTimeNotification,
      // notificationID,
      created_at: String(new Date()),
      updated_at: String(new Date()),
    }

    const storageAppointments = await saveAppointment({ ...data })
    setAppointments(storageAppointments)
  }

  const deleteAppointment = async (id: string) => {
    await removeAppointment(id)
    setAppointments((prev) => prev.filter((item) => item.id !== id))
  }

  const saveNewOperation = async (operation: OperationDTO) => {
    const dateNow = new Date().getTime()
    const { ticker, targetBuy, targetLoss } = operation

    const targetParcial = calculateParcial(targetLoss, targetBuy)

    const targetFinal = calculateFinal(targetLoss, targetBuy)

    const risk = calculateOperationRisk(targetLoss, targetBuy)

    if (isEditing) {
      const editingData: OperationProps = {
        id: editingOper.id,
        ticker,
        targetBuy,
        targetLoss,
        targetParcial,
        targetFinal,
        risk,
        created_at: editingOper.created_at,
        updated_at: String(new Date()),
      }
      const storageOperations = await updateOperation(editingOper.id, {
        ...editingData,
      })
      setOperations(storageOperations)
    } else {
      const data: OperationProps = {
        id: String(dateNow),
        ticker,
        targetBuy,
        targetLoss,
        targetParcial,
        targetFinal,
        risk,
        created_at: String(new Date()),
        updated_at: String(new Date()),
      }
      const storageOperations = await saveOperation({ ...data })
      setOperations(storageOperations)
    }
    setIsEditing(false)
    setEditingOper({
      ticker: '',
      targetBuy: '',
      targetLoss: '',
    } as OperationProps)
  }

  const deleteOperation = async (id: string) => {
    await removeOperation(id)
    setOperations((prev) => prev.filter((item) => item.id !== id))
  }

  const editOperation = async (id: string) => {
    setEditingOper(operations.find((item) => item.id === id))
    setIsEditing(true)
  }

  useEffect(() => {
    setAppointmentsList(
      appointments
        .sort((a, b) => a.time_left - b.time_left)
        .filter(
          (schedule) =>
            new Date(schedule.full_date_time).getTime() >= new Date().getTime(),
        ),
    )
  }, [appointments])

  useEffect(() => {
    const loadAsyncStorage = async () => {
      const storageAppointments = await loadAppointments()
      setAppointments(storageAppointments)
      const storageOperations = await loadOperations()
      setOperations(storageOperations)
    }
    loadAsyncStorage()
    setIsLoading(false)
  }, [])

  const providerValues = {
    isLoading,
    shouldUpdate,
    setShouldUpdate,
    appointments,
    appointmentSelection,
    selectedAppointment,
    saveNewAppointment,
    setAppointmentsList,
    deleteAppointment,
    saveNewOperation,
    operations,
    deleteOperation,
    editOperation,
    editingOper,
    setEditingOper,
    isEditing,
    setIsEditing,
  }

  return (
    <AppointmentsContext.Provider value={providerValues}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments(): AppointmentsContextData {
  const context = useContext(AppointmentsContext)
  if (!context) {
    throw new Error(
      'useAppointments must be used within a AppointmentsProvider',
    )
  }
  return context
}
