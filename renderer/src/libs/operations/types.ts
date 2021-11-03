import { OperationProps } from '../../contexts/AppointmentsProvider/types'

export type StorageProps = {
  [id: string]: {
    data: OperationProps
  }
}

export type StorageDTO = OperationProps
