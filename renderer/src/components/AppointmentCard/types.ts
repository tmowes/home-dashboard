import { AppointmentsProps } from '../../contexts/AppointmentsProvider/types'

export type AppointmentCardProps = AppointmentsProps & {
  onDismiss: (id: string) => void
}
