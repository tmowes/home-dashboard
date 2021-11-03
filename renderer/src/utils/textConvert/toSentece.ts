export const convertToSentence = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(
      /^[A-Za-z]/g,
      (char) => char.charAt(0).toUpperCase() + char.substr(1).toLowerCase(),
    )
    .replaceAll('-', ' ')
    .trim()
