export const convertToSnake = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '_') // spaces to dashes
    .replace(/&/g, '_') // ampersand to and
    .replace(/[^\w-]+/g, '') // remove non-words
    .replace(/--+/g, '_') // collapse multiple dashes
    .replace(/^-+/, '') // trim starting dash
    .replace(/-+$/, '') // trim ending dash
