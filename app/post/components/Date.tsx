import { format } from 'date-fns'

export default function DateLabel({ date }: { date: Date }) {
  return <time>{format(date, 'LLLL d, yyyy')}</time>
}
