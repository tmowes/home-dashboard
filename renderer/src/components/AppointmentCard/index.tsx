import { useMemo } from 'react'

import { Icon, IconButton, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { AiOutlineClose } from 'react-icons/ai'

import { getRelativeDateFromNow } from '../../utils/getRelativeDateFromNow'
import { AppointmentCardProps } from './types'
import { convertToSentence } from '../../utils/textConvert/toSentece'

export const AppointmentCard = (props: AppointmentCardProps) => {
  const {
    id,
    title,
    location,
    about,
    day_month_date,
    full_date_time,
    time_left,
    time,
    onDismiss,
  } = props

  const parsedTitle = useMemo(
    () =>
      `${convertToSentence(title)} será ${getRelativeDateFromNow(
        full_date_time,
      )}`,
    [full_date_time, title],
  )

  return (
    <Flex
      w="100%"
      mt="2"
      bgGradient="linear(to-tr, gray.800, gray.700, gray.700, gray.800,)"
      _hover={{
        bgGradient: 'linear(to-tr, gray.800, gray.700, gray.600, gray.800,)',
      }}
      borderRadius="8"
    >
      <VStack w="100%" align="flex-start" spacing="1" borderRadius="8" p="2">
        <Heading fontSize={16} textAlign="left">
          {parsedTitle}
        </Heading>
        <Text>{`Local: ${location}`}</Text>
        <Text>{`${day_month_date} ás ${time} ${time_left / 1000}`}</Text>
        <Text>{about}</Text>
      </VStack>
      <IconButton
        h="8"
        w="8"
        ml="auto"
        aria-label="apagar"
        fontWeight="semibold"
        borderRadius="4"
        bgGradient="linear(to-tr, gray.800, gray.700,)"
        _active={{
          bgGradient: 'linear(to-bl, gray.600, gray.700)',
        }}
        _focus={{
          outlineColor: 'transparent',
          borderColor: 'gray',
          borderWidth: '1px',
        }}
        _hover={{
          bgGradient: 'linear(to-bl, gray.600, gray.800)',
        }}
        onClick={() => onDismiss(id)}
        icon={<Icon as={AiOutlineClose} fontSize="22" />}
      />
    </Flex>
  )
}
