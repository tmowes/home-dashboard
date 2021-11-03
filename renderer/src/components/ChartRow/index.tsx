import React from 'react'

import { Flex } from '@chakra-ui/react'

import { ChartLeftArea } from './ChartLeftArea'
import { ChartRightArea } from './ChartRightArea'
import { ChartRowProps } from './types'

export function ChartRow(props: ChartRowProps) {
  const { left, right } = props

  return (
    <Flex px="4" h="40%" justify="space-between" my="auto">
      <ChartLeftArea title={left} />
      <ChartRightArea title={right} />
    </Flex>
  )
}
