import { OperationProps } from '../../contexts/AppointmentsProvider/types'

export type OperationCardProps = OperationProps & {
  onDismiss: (id: string) => void
  onEdit: (id: string) => void
}
