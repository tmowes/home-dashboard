import React from 'react'

import { Flex } from '@chakra-ui/react'
import {
  FiDollarSign,
  FiBarChart,
  FiClipboard,
  FiCreditCard,
} from 'react-icons/fi'

import { DashCardItem } from '../DashCardItem'
import { useXLSXData } from '../../contexts'

export function DashCardList() {
  const {
    quantitiesYearly,
    revenueYearly,
    revenueByCreditCardYearly,
    revenueByMoneyYearly,
  } = useXLSXData()

  const dashCardData = [
    {
      title: 'Receita Total',
      value: revenueYearly.toLocaleString('pt-BR', {
        currency: 'BRL',
        maximumFractionDigits: 0,
      }),
      icon: FiDollarSign,
    },
    {
      title: 'Quantidade Vendida',
      value: quantitiesYearly.toFixed(0),
      icon: FiBarChart,
    },
    {
      title: 'Boleto Bancário',
      value: revenueByMoneyYearly.toLocaleString('pt-BR', {
        currency: 'BRL',
        maximumFractionDigits: 0,
      }),
      icon: FiClipboard,
    },
    {
      title: 'Cartão de Crédito',
      value: revenueByCreditCardYearly.toLocaleString('pt-BR', {
        currency: 'BRL',
        maximumFractionDigits: 0,
      }),
      icon: FiCreditCard,
    },
  ]

  return (
    <Flex px="4" h="20" align="center" justify="space-between" my="auto">
      {dashCardData.map((data) => (
        <DashCardItem key={data.title} {...data} />
      ))}
    </Flex>
  )
}
