export function netejaString(str: string): string {
  return str
    .normalize("NFD") // separa accents
    .replace(/[\u0300-\u036f]/g, "") // elimina accents
    .replace(/\s+/g, "") // elimina tots els espais
    .toLowerCase(); // tot en minúscula
}