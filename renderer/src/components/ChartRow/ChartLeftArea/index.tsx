/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { useEffect, useMemo, useState } from 'react'

import { Flex, Heading } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

import { ChartLeftAreaProps } from './types'

const createDataSeries = Array.from({ length: 12 }, () =>
  Math.round(Math.random() * 100),
)

const createMonths = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
)

export function ChartLeftArea(props: ChartLeftAreaProps) {
  const { title } = props
  const [windowReady, setWindowReady] = useState(false)
  const [chartOptions, setChartOptions] = useState({} as ApexOptions)
  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Selecione uma ferramenta para abrir o gráfico',
      type: 'area',
      data: createDataSeries,
    },
  ])

  const categories = useMemo(() => createMonths, [])

  useEffect(() => {
    setWindowReady(true)
  }, [])

  useEffect(() => {
    const average = 50
    const filename = `filename`

    setChartOptions({
      legend: {
        show: false,
      },
      chart: {
        id: 'tool-chart',
        background: '#2D3748',
        stackType: 'normal',
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5,
        },
        toolbar: {
          show: true,
          offsetX: -16,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            selection: false,
            download: true,
          },
          export: {
            png: {
              filename,
            },
            svg: {
              filename,
            },
            csv: {
              columnDelimiter: ';',
              filename,
            },
          },
        },
      },
      xaxis: {
        type: 'category',
        labels: {
          offsetX: 0,
          rotate: -45,
          rotateAlways: true,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: 'white',
          },
        },
        tooltip: {
          enabled: false,
        },
        categories,
      },
      yaxis: {
        opposite: true,
        min: 0,
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['white'],
          },
        },
      },
      markers: {
        size: [4, 0],
      },
      stroke: {
        curve: 'smooth',
        width: [4, 2],
      },
      grid: {
        borderColor: 'transparent',
      },
      tooltip: {
        enabledOnSeries: [0],
        theme: 'dark',
        shared: true,
        fixed: {
          enabled: true,
          position: 'absolute',
          offsetX: 360,
          offsetY: -12,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        offsetY: -8,
        background: {
          foreColor: 'white',
          borderWidth: 0,
          dropShadow: {
            enabled: true,
          },
        },
        style: {
          fontSize: '16px',
          colors: ['transparent'],
        },
      },
      fill: {
        opacity: [0.1, 1],
        gradient: {
          type: 'vertical',
          inverseColors: true,
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          shade: 'dark',
          stops: [0, 50],
        },
      },
    })

    setChartSeries([
      {
        name: 'activeTool.label',
        type: 'area',
        data: createDataSeries,
      },
      {
        name: 'Media',
        type: 'line',
        data: new Array(createDataSeries.length).fill(average),
      },
    ])
  }, [categories])

  const NewChart =
    global?.window && global?.window !== undefined
      ? require('react-apexcharts').default
      : null

  return (
    <Flex
      flex="1"
      mr="4"
      w="100%"
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
        <Flex
          w="100%"
          align="center"
          direction="column"
          bg="gray.700"
          justify="end"
        >
          {windowReady && (
            <NewChart
              options={chartOptions}
              series={chartSeries}
              height={408}
              width={570}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
