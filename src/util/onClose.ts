import axios from 'axios'
import GuestSearch from '@/types/GuestSearch'
import closeWindows from '@/util/closeWindows'

const url = '/api/invoices'

const onClose = async ({ guestName, checkNumber, roomNumber }: GuestSearch) => {
  const req = {
    checkNumber,
    room: roomNumber,
    user: guestName,
  }
  await axios.post(url, req)
  closeWindows()
}

export default onClose
