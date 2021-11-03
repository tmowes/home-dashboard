import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    'gray.950': '#121218',
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'transparent',
        color: 'gray.100',
      },
      '*::placeholder': {
        color: 'gray.100',
      },
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        bgGradient:
          'linear(to-b, gray.400, gray.500, gray.500, gray.500, gray.500, gray.500, gray.700)',
        borderRadius: '3px',
      },
      '&::focus': {
        outlineColor: 'transparent',
        borderColor: 'gray.700',
        borderWidth: '1px',
        borderRadius: '6px',
      },
      '*::-webkit-calendar-picker-indicator': {
        filter: 'invert(100%)',
        fontSize: '22px',
      },
    },
  },
})
