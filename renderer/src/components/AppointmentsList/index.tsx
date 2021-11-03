import { Flex, Text } from '@chakra-ui/react'

import { useAppointments } from '../../contexts/AppointmentsProvider'
import { AppointmentCard } from '../AppointmentCard'
import { OperationCard } from '../OperationCard'

export const AppointmentsList = () => {
  const {
    appointments,
    deleteAppointment,
    operations,
    deleteOperation,
    editOperation,
  } = useAppointments()

  return (
    <Flex w="100%" h="100%">
      <Flex w="100%" align="center" direction="column" p="2">
        <Text>Seus próximos eventos</Text>
        <Flex direction="column" w="100%" h="50%" overflowY="scroll" mb="4">
          {appointments
            .sort((a, b) => a.time_left - b.time_left)
            .map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                onDismiss={() => deleteAppointment(appointment.id)}
                {...appointment}
              />
            ))}
        </Flex>
        <Text>Suas próximas operações</Text>
        <Flex direction="column" w="100%" h="50%" overflowY="scroll" mb="4">
          {operations.map((operation) => (
            <OperationCard
              key={operation.id}
              onDismiss={() => deleteOperation(operation.id)}
              onEdit={() => editOperation(operation.id)}
              {...operation}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
