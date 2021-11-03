import parseISO from 'date-fns/parseISO'
import ptBR from 'date-fns/locale/pt-BR'
import formatRelative from 'date-fns/formatRelative'

export const getRelativeDateFromNow = (date: string, now = new Date()) =>
  formatRelative(parseISO(date), now, {
    locale: ptBR,
  })
