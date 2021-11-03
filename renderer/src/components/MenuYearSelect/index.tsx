import { Button, HStack } from '@chakra-ui/react'

import { useXLSXData } from '../../contexts'

export function MenuYearSelect() {
  const { allYears, selectedYear, setSelectedYear } = useXLSXData()

  return (
    <HStack
      spacing="1"
      ml="auto"
      p="2"
      mr="4"
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="8"
    >
      {allYears.map((year) => (
        <Button
          key={year}
          h="7"
          w="100%"
          px="2"
          colorScheme="orange"
          fontWeight="semibold"
          borderColor="transparent"
          borderWidth="1px"
          bgGradient="linear(to-r, gray.600, gray.500,)"
          _hover={{
            bgGradient: 'linear(to-l, gray.400, gray.600)',
          }}
          _active={{
            bgGradient: 'linear(to-r, red.500, orange.300)',
          }}
          _focus={{
            outlineColor: 'transparent',
            borderColor: 'gray',
            borderWidth: '1px',
          }}
          isActive={selectedYear === year}
          onClick={() => setSelectedYear(year)}
          boxShadow="dark-lg"
        >
          {year}
        </Button>
      ))}
    </HStack>
  )
}
