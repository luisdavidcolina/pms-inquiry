interface GuestSearch {
  checkNumber: string
  guestName: string
  roomNumber: string
}

export const guestSearchDefault: GuestSearch = {
  checkNumber: '',
  guestName: '',
  roomNumber: '',
}

export default GuestSearch
