import React from 'react'

import { AiOutlineClose, AiOutlineMinus } from 'react-icons/ai'
import { Box, Flex, Text, Image, Icon, IconButton } from '@chakra-ui/react'
import { ipcRenderer } from 'electron'

import { WindowContainerProps } from './types'

export const WindowContainer = (props: WindowContainerProps) => {
  const { children, appTitle } = props

  const onClickClose = () => {
    ipcRenderer.send('close-window')
  }

  const onClickMinimize = () => {
    ipcRenderer.send('minimize-window')
  }

  return (
    <Box
      w="100vw"
      h="100vh"
      bgGradient="linear(to-r, gray.900, gray.900, blackAlpha.800)"
      backdropBlur="8px"
      borderRadius="8"
      overflow="hidden"
      __css={{
        WebkitUserSelect: 'none',
        WebkitAppRegion: 'drag',
      }}
    >
      <Flex align="center" justify="space-between" h="32px" boxShadow="dark-lg">
        <Flex h="32px" align="center">
          <Image src="icon.ico" w="48px" h="100%" />
          <Text fontSize={16}>{appTitle}</Text>
        </Flex>
        <Box mr="2" w="8" h="8" ml="16" />
        <Flex
          __css={{
            WebkitAppRegion: 'no-drag',
          }}
        >
          <IconButton
            icon={<Icon as={AiOutlineMinus} />}
            onClick={onClickMinimize}
            aria-label="navTitle"
            bg="transparent"
            fontSize="18"
            h="32px"
            color="gray.100"
            mt="1px"
            borderRadius="0"
            colorScheme="transparent"
            _hover={{
              bgGradient: 'linear(to-b, gray.700, transparent)',
            }}
            _focus={{
              outlineColor: 'transparent',
              borderColor: 'gray.700',
              borderWidth: '1px',
              borderRadius: '6px',
            }}
          />
          <IconButton
            icon={<Icon as={AiOutlineClose} />}
            onClick={onClickClose}
            aria-label="navTitle"
            bg="transparent"
            h="32px"
            fontSize="18"
            color="gray.100"
            mt="1px"
            borderRadius="0"
            colorScheme="blackAlpha"
            _hover={{
              bgGradient: 'linear(to-bl, red.800, transparent)',
            }}
            _focus={{
              outlineColor: 'transparent',
              borderColor: 'gray.700',
              borderWidth: '1px',
              borderRadius: '6px',
            }}
          />
        </Flex>
      </Flex>
      <Flex h="100%" boxShadow="dark-lg">
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="center"
          bg="gray.950"
          boxShadow="dark-lg"
          __css={{
            WebkitAppRegion: 'no-drag',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}
