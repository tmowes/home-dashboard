import { Icon, IconButton, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'

import { OperationCardProps } from './types'
import { convertToCurrency } from '../../utils/textConvert/toCurrency'
import { convertToPercentage } from '../../utils/textConvert/toPercentage'

export const OperationCard = (props: OperationCardProps) => {
  const {
    id,
    ticker,
    targetBuy,
    targetLoss,
    targetParcial,
    targetFinal,
    risk,
    onDismiss,
    onEdit,
  } = props

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
      <VStack w="100%" spacing="1" p="2">
        <Heading fontSize={22} textAlign="left">
          {ticker}
        </Heading>
        <Flex w="100%" justify="space-between">
          <VStack spacing="0" w="15%" borderRadius="8" border="1px solid gray">
            <Text fontSize={13} color="gray.400">
              entrada
            </Text>
            <Text>{convertToCurrency(targetBuy)}</Text>
          </VStack>
          <VStack spacing="0" w="15%" borderRadius="8" border="1px solid gray">
            <Text fontSize={13} color="gray.400">
              stop
            </Text>
            <Text>{convertToCurrency(targetLoss)}</Text>
          </VStack>
          <VStack spacing="0" w="15%" borderRadius="8" border="1px solid gray">
            <Text fontSize={13} color="gray.400">
              parcial
            </Text>
            <Text>{convertToCurrency(targetParcial)}</Text>
          </VStack>
          <VStack spacing="0" w="15%" borderRadius="8" border="1px solid gray">
            <Text fontSize={13} color="gray.400">
              final
            </Text>
            <Text>{convertToCurrency(targetFinal)}</Text>
          </VStack>
          <VStack spacing="0" w="15%" borderRadius="8" border="1px solid gray">
            <Text fontSize={13} color="gray.400">
              risco
            </Text>
            <Text>{convertToPercentage(risk)}</Text>
          </VStack>
        </Flex>
      </VStack>
      <VStack justify="space-between">
        <IconButton
          h="8"
          w="8"
          ml="auto"
          aria-label="apagar"
          fontWeight="semibold"
          bg="transparent"
          bgGradient="linear(to-bl, gray.800, gray.700, transparent, transparent)"
          _active={{
            bgGradient: 'linear(to-bl, red.600, transparent)',
          }}
          _focus={{
            outlineColor: 'transparent',
            borderColor: 'gray',
            borderWidth: '1px',
          }}
          _hover={{
            bgGradient:
              'linear(to-bl, red.800, red.800, transparent, transparent)',
          }}
          onClick={() => onDismiss(id)}
          icon={<Icon as={AiOutlineClose} fontSize="22" />}
        />
        <IconButton
          h="8"
          w="8"
          ml="auto"
          aria-label="apagar"
          fontWeight="semibold"
          bg="transparent"
          bgGradient="linear(to-tl, gray.800, transparent, transparent)"
          _active={{
            bgGradient: 'linear(to-tl, blue.700, transparent)',
          }}
          _focus={{
            outlineColor: 'transparent',
            borderColor: 'gray',
            borderWidth: '1px',
          }}
          _hover={{
            bgGradient:
              'linear(to-tl, blue.800, blue.800, transparent, transparent)',
          }}
          onClick={() => onEdit(id)}
          icon={<Icon as={AiOutlineEdit} fontSize="22" />}
        />
      </VStack>
    </Flex>
  )
}
