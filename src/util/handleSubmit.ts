import axios from 'axios'
import GuestSearch from '@/types/GuestSearch'

const handleSubmit = async (guestSearch: GuestSearch) => {
  try {
    const response = await axios.get(`/api/rooms/${guestSearch.roomNumber}`)
    const customer = response.data[0]
    const { nombre_cliente, apellido_cliente } = customer
    const guestName = nombre_cliente + ' ' + apellido_cliente
    return guestName
  } catch (error) {
    return 'No se encontrĂ³ el cliente'
  }
}

export default handleSubmit
