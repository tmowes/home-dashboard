import { Dispatch, ReactNode, SetStateAction } from 'react'

export type AppointmentsProviderProps = {
  children: ReactNode
}

export type AppointmentsContextData = {
  isLoading: boolean
  shouldUpdate: boolean
  appointments: AppointmentsProps[]
  appointmentSelection: (id: string) => AppointmentsProps | undefined
  selectedAppointment: AppointmentsProps
  saveNewAppointment: (appointment: AppointmentDTO) => Promise<void>
  setAppointmentsList: Dispatch<SetStateAction<AppointmentsProps[]>>
  deleteAppointment: (id: string) => Promise<void>
  setShouldUpdate: Dispatch<SetStateAction<boolean>>
  saveNewOperation: (operation: OperationDTO) => Promise<void>
  deleteOperation: (id: string) => Promise<void>
  operations: OperationProps[]
  editOperation: (id: string) => Promise<void>
  editingOper: OperationProps
  setEditingOper: Dispatch<SetStateAction<OperationProps>>
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export type AppointmentsProps = {
  id: string
  title: string
  about?: string
  location: string
  date: string
  day_month_date: string
  full_date_time: string
  time: string
  full_day: boolean
  time_left: number
  notifications: boolean
  relativity_date: string
  // notificationID: string
  dateTimeNotification: Date
  created_at: string
  updated_at: string
}

export type AppointmentDTO = {
  title: string
  location: string
  about?: string
  date: string
  time: string
  full_day: boolean
  dateTimeNotification: Date
  notifications: boolean
}

export type OperationDTO = {
  ticker: string
  targetBuy: string
  targetLoss: string
}

export type OperationProps = {
  id: string
  ticker: string
  targetBuy: string
  targetLoss: string
  targetParcial: string
  targetFinal: string
  risk: string
  created_at: string
  updated_at: string
}
