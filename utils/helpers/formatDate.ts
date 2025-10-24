import { format } from "date-fns"
import { ca } from 'date-fns/locale'

export const formatDate = (isoDate: string): string => {
  return format(new Date(isoDate), "dd.MM.yy - H'h'mm''")
}

//"dd.MM.yy - H'h'mm''ss''"

export const formatData = (dateString: string) => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "Data no vàlida"
  return format(date, "dd MMMM yyyy", { locale: ca })
}
