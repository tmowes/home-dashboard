/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState } from 'react'

import { Flex, Heading } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

import { useXLSXData } from '../../../contexts'
import { ChartRightAreaProps } from './types'

export function ChartRightArea(props: ChartRightAreaProps) {
  const { title } = props
  const { revenueByMoneyYearly, revenueByCreditCardYearly } = useXLSXData()
  const [windowReady, setWindowReady] = useState(false)
  const [chartOptions, setChartOptions] = useState({} as ApexOptions)
  const [chartSeries, setChartSeries] = useState([
    revenueByCreditCardYearly,
    revenueByMoneyYearly,
  ])

  useEffect(() => {
    setWindowReady(true)
  }, [])

  useEffect(() => {
    setChartOptions({
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          colors: ['#E59A4D'],
        },
      },
      tooltip: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      fill: {
        colors: ['#171923', '#677690'],
      },

      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          donut: {
            size: '55%',
            background: 'transparent',
          },
        },
      },
    })

    setChartSeries([revenueByCreditCardYearly, revenueByMoneyYearly])
  }, [revenueByCreditCardYearly, revenueByMoneyYearly])

  const NewChart =
    global?.window && global?.window !== undefined
      ? require('react-apexcharts').default
      : null

  return (
    <Flex
      w="35%"
      bgGradient="linear(to-r, gray.600, gray.500,)"
      _hover={{
        bgGradient: 'linear(to-l, gray.400, gray.600)',
      }}
      h="100%"
      borderRadius="12"
      overflow="hidden"
      shadow="dark-lg"
    >
      <Flex direction="column" w="100%">
        <Heading fontSize={20} fontWeight="semibold" textAlign="center" py="1">
          {title}
        </Heading>
        <Flex w="100%" h="100%" align="center" justify="center" bg="gray.700">
          {windowReady && (
            <NewChart
              options={chartOptions}
              series={[...chartSeries]}
              width={400}
              type="donut"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
