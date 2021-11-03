/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { Flex, Heading } from '@chakra-ui/react'

import { MenuYearSelect } from '../components/MenuYearSelect'
import { MenuProductSelect } from '../components/MenuProductSelect'
import { DashCardList } from '../components/DashCardList'
import { ChartRow } from '../components/ChartRow'

export default function Home() {
  const chartRowTitle = [
    {
      left: 'Receita Total por Mês',
      right: 'Total por Produto',
    },
    {
      left: 'Quantidade Vendida por Mês',
      right: 'Distribuição de Pagamento',
    },
  ]

  return (
    <Flex w="100%" h="97%" p="2" overflow="hidden">
      <Flex
        w="100%"
        h="100%"
        borderRadius="8"
        overflow="hidden"
        direction="column"
      >
        <Flex
          w="100%"
          h="12"
          align="center"
          justify="space-between"
          p="4"
          my="auto"
        >
          <Heading fontSize={24}>Dashboard de vendas</Heading>
          <MenuYearSelect />
          <MenuProductSelect />
        </Flex>
        <DashCardList />
        {chartRowTitle.map((row) => (
          <ChartRow key={row.left} {...row} />
        ))}
      </Flex>
    </Flex>
  )
}
