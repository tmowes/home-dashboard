import React, { useEffect, useState } from 'react'

import { NumberInputField } from '@chakra-ui/react'
import { NumberInput } from '@chakra-ui/react'
import format from 'date-fns/format'
import addHours from 'date-fns/addHours'
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  Flex,
  Text,
  Icon,
  HStack,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

import { useAppointments } from '../../contexts/AppointmentsProvider'
import { OperationProps } from '../../contexts/AppointmentsProvider/types'

export const AppointmentForm = () => {
  const {
    saveNewAppointment,
    saveNewOperation,
    editingOper,
    isEditing,
    setEditingOper,
    setIsEditing,
  } = useAppointments()

  const [selectedTime, setSelectedTime] = useState(
    format(addHours(new Date(), 1).setMinutes(0), 'HH:mm'),
  )
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  )
  const [location, setLocation] = useState('')
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [ticker, setTicker] = useState(editingOper.ticker)
  const [targetBuy, setTargetBuy] = useState(editingOper.targetBuy)
  const [targetLoss, setTargetLoss] = useState(editingOper.targetLoss)

  const name = 'Cadastro de evento'
  const name2 = 'Cadastro de operação'
  const inputFocus = { borderColor: 'orange.500' }
  const inputHover = { borderColor: 'transparent', bg: 'gray.500' }

  const isDisabled =
    location.trim() === '' || title.trim() === '' || about.trim() === ''
  const isDisabled2 =
    ticker.trim() === '' || targetBuy.trim() === '' || targetLoss.trim() === ''
  const isClean =
    ticker.trim() !== '' || targetBuy.trim() !== '' || targetLoss.trim() !== ''

  const handleSaveNewAppointment = async () => {
    const data = {
      title,
      about,
      location,
      date: selectedDate,
      full_day: true,
      notifications: true,
      time: selectedTime,
      dateTimeNotification: new Date('2021-11-12'),
    }
    try {
      await saveNewAppointment(data)
      setTitle('')
      setLocation('')
      setAbout('')
    } catch (err) {
      console.error('Não foi possivel salvar agendamento.')
    }
  }

  const handleSaveNewOperation = async () => {
    const data = { ticker, targetBuy, targetLoss }
    try {
      await saveNewOperation(data)
      setTicker('')
      setTargetBuy('')
      setTargetLoss('')
    } catch (err) {
      console.error('Não foi possivel salvar operação.')
    }
  }

  const clearForm = () => {
    setTicker('')
    setTargetBuy('')
    setTargetLoss('')
    setEditingOper({
      id: '',
      ticker: '',
      targetBuy: '',
      targetLoss: '',
    } as OperationProps)
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing) {
      setTicker(editingOper.ticker)
      setTargetBuy(editingOper.targetBuy)
      setTargetLoss(editingOper.targetLoss)
    }
  }, [editingOper, isEditing])

  return (
    <Flex w="50%" bg="gray.900" direction="column" p="2">
      <Flex w="100%" align="center" direction="column" p="2">
        <Text>{name}</Text>
        <VStack w="100%" spacing="2">
          <FormControl id="event_date">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Data:
            </FormLabel>
            <Input
              px="2"
              bg="gray.600"
              h={9}
              fontSize={14}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              color="gray.100"
              boxShadow="dark-lg"
              _focus={inputFocus}
              _hover={inputHover}
              borderColor="transparent"
            />
          </FormControl>
          <FormControl id="event_time">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Horário:
            </FormLabel>
            <Input
              px="2"
              bg="gray.600"
              h={9}
              fontSize={14}
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              color="gray.100"
              boxShadow="dark-lg"
              _focus={inputFocus}
              _hover={inputHover}
              borderColor="transparent"
            />
          </FormControl>
          <FormControl id="event_name">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Evento:
            </FormLabel>
            <Input
              px="2"
              bg="gray.600"
              h={9}
              fontSize={14}
              placeholder="Digite um nome para o evento..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              color="gray.100"
              boxShadow="dark-lg"
              _focus={inputFocus}
              _hover={inputHover}
              borderColor="transparent"
            />
          </FormControl>
          <FormControl id="event_local">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Local:
            </FormLabel>
            <Input
              px="2"
              bg="gray.600"
              h={9}
              fontSize={14}
              placeholder="Digite localização do evento..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              color="gray.100"
              boxShadow="dark-lg"
              _focus={inputFocus}
              _hover={inputHover}
              borderColor="transparent"
            />
          </FormControl>
          <FormControl id="event_name">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Mensagem:
            </FormLabel>
            <Textarea
              px="2"
              bg="gray.600"
              h={9}
              fontSize={14}
              mb="1"
              placeholder="Digite uma mensagem sobre o evento..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              color="gray.100"
              boxShadow="dark-lg"
              _focus={inputFocus}
              _hover={inputHover}
              borderColor="transparent"
            />
          </FormControl>
          <HStack w="100%" spacing="2">
            <Button
              h="8"
              w="100%"
              colorScheme="orange"
              fontWeight="semibold"
              bgGradient="linear(to-r, gray.700, gray.600,)"
              boxShadow="dark-lg"
              _focus={{
                outlineColor: 'transparent',
                borderColor: 'gray',
                borderWidth: '1px',
              }}
              _hover={{
                bgGradient: 'linear(to-l, gray.500, gray.700)',
              }}
              // disabled={isDisabled}
              // onClick={writeDataToFiles}
              leftIcon={<Icon as={AiOutlineClose} fontSize="22" />}
            >
              Cancelar
            </Button>
            <Button
              h="8"
              w="100%"
              colorScheme="orange"
              fontWeight="semibold"
              boxShadow="dark-lg"
              bgGradient="linear(to-r, orange.600, orange.400,)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, orange.300)',
              }}
              _focus={{
                outlineColor: 'transparent',
                borderColor: 'gray',
                borderWidth: '1px',
              }}
              disabled={isDisabled}
              onClick={handleSaveNewAppointment}
              leftIcon={<Icon as={AiOutlineCheck} fontSize="22" />}
            >
              Salvar
            </Button>
          </HStack>
        </VStack>
      </Flex>
      <Flex w="100%" align="center" direction="column" p="2" mt="auto" mb="2">
        <Text>{name2}</Text>
        <VStack w="100%" spacing="2">
          <FormControl id="operation_ticker">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Ticker:
            </FormLabel>
            <Input
              px="2"
              bg="gray.600"
              h={8}
              fontSize={14}
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              color="gray.100"
              boxShadow="dark-lg"
              _focus={inputFocus}
              _hover={inputHover}
              borderColor="transparent"
            />
          </FormControl>
          <FormControl id="operation_target_in">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Entrada:
            </FormLabel>
            <NumberInput
              allowMouseWheel
              precision={2}
              step={0.01}
              size="sm"
              value={targetBuy}
              onChange={(e) => setTargetBuy(e)}
              focusBorderColor="orange.500"
              borderColor="transparent"
              color="gray.100"
              boxShadow="dark-lg"
              bg="gray.600"
              borderRadius="4"
              _focus={inputFocus}
              _hover={inputHover}
            >
              <NumberInputField rounded="6" _hover={inputHover} />
            </NumberInput>
          </FormControl>
          <FormControl id="operation_target_loss">
            <FormLabel color="gray.200" my="-0.5" fontSize="small">
              Saída:
            </FormLabel>
            <NumberInput
              allowMouseWheel
              precision={2}
              step={0.01}
              size="sm"
              value={targetLoss}
              onChange={(e) => setTargetLoss(e)}
              focusBorderColor="orange.500"
              borderColor="transparent"
              color="gray.100"
              boxShadow="dark-lg"
              bg="gray.600"
              borderRadius="4"
              _focus={inputFocus}
              _hover={inputHover}
            >
              <NumberInputField rounded="6" _hover={inputHover} />
            </NumberInput>
          </FormControl>
          <HStack w="100%" spacing="2">
            <Button
              h="8"
              w="100%"
              fontWeight="semibold"
              colorScheme="blackAlpha"
              bgGradient="linear(to-r, gray.700, gray.600,)"
              _hover={{
                bgGradient: 'linear(to-l, gray.500, gray.700)',
              }}
              boxShadow="dark-lg"
              _focus={{
                outlineColor: 'transparent',
                borderColor: 'gray',
                borderWidth: '1px',
              }}
              disabled={!isClean}
              onClick={clearForm}
              leftIcon={<Icon as={AiOutlineClose} fontSize="22" />}
            >
              Cancelar
            </Button>
            <Button
              h="8"
              w="100%"
              colorScheme="orange"
              fontWeight="semibold"
              boxShadow="dark-lg"
              bgGradient="linear(to-r, orange.600, orange.400,)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, orange.300)',
              }}
              _focus={{
                outlineColor: 'transparent',
                borderColor: 'gray',
                borderWidth: '1px',
              }}
              disabled={isDisabled2}
              onClick={handleSaveNewOperation}
              leftIcon={<Icon as={AiOutlineCheck} fontSize="22" />}
            >
              Salvar
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  )
}
