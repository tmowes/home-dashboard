import { Button, HStack } from '@chakra-ui/react'

import { useXLSXData } from '../../contexts'

export function MenuProductSelect() {
  const { allProducts, selectedProduct, setSelectedProduct } = useXLSXData()

  return (
    <HStack
      spacing="1"
      p="2"
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="8"
    >
      {allProducts.map((product) => (
        <Button
          key={product}
          h="7"
          w="100%"
          px="2"
          fontWeight="normal"
          fontSize={14}
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
          isActive={selectedProduct === product}
          onClick={() => setSelectedProduct(product)}
          boxShadow="dark-lg"
        >
          {product}
        </Button>
      ))}
    </HStack>
  )
}
