import { AppointmentsProps } from '../../contexts/AppointmentsProvider/types'

export type StorageProps = {
  [id: string]: {
    data: AppointmentsProps
    // notificationID: string
  }
}

export type StorageDTO = AppointmentsProps
