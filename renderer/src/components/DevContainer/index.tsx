import { Box, Flex, Text } from '@chakra-ui/react'

export const DevContainer = () => {
  const name = 'DevContainer'
  return (
    <Flex w="100%" h="100%" p="2">
      <Flex align="center" h="12" p="2">
        <Text>{name}</Text>
        <Box
          w="16"
          h="8"
          bgGradient="linear(to-r, red.500, orange.500,)"
          borderRadius="8"
          ml="2"
        />
      </Flex>
    </Flex>
  )
}
