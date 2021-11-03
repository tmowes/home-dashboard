import React from 'react'

import { Circle, Flex, Heading, Icon, Text } from '@chakra-ui/react'

import { DashCardItemProps } from './types'

export function DashCardItem(props: DashCardItemProps) {
  const { title, value, icon: IconName } = props
  return (
    <Flex
      p="1px"
      borderRadius="12"
      shadow="dark-lg"
      align="center"
      justify="center"
      bgGradient="linear(to-r, orange.600, orange.400,)"
      _hover={{
        bgGradient: 'linear(to-r, red.500, orange.300)',
      }}
    >
      <Flex bg="gray.700" p="2" px="3" borderRadius="12">
        <Flex direction="column" w="100%" mr="3">
          <Heading fontSize={26} textAlign="center">
            {value}
          </Heading>
          <Text fontSize={16} textAlign="center">
            {title}
          </Text>
        </Flex>
        <Circle
          m="auto"
          align="center"
          justify="center"
          p="2px"
          bgGradient="linear(to-r, orange.600, orange.400,)"
          _hover={{
            bgGradient: 'linear(to-r, red.500, orange.300)',
          }}
        >
          <Circle bg="gray.700" m="auto" p="2">
            <Icon as={IconName} fontSize="32" />
          </Circle>
        </Circle>
      </Flex>
    </Flex>
  )
}
