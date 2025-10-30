
export const recurtaParagraf = (text: string, maxWords: number = 50, maxLines: number = 12): string => {
  const words = text.split(' ')
  const lines = text.split('\n')

  if (words.length > maxWords || lines.length > maxLines) {
    return words.slice(0, maxWords).join(' ') + '..';
  }
  return text + ' ';
};