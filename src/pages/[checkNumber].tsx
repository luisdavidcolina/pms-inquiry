import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { NumericKeyboard, Paper } from '@/components'
import onClose from '@/util/onClose'
import handleSubmit from '@/util/handleSubmit'
import useTranslation from '@/util/useTranslation'
import GuestSearch, { guestSearchDefault } from '@/types/GuestSearch'

const Home = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { checkNumber } = router.query
  const [isSubmitting, setIsSubmitting] = useState<Boolean | undefined>(
    undefined,
  )
  const [guestSearch, setGuestSearch] =
    useState<GuestSearch>(guestSearchDefault)

  const text = (number: string) => {
    const clean = number === ''
    const newNumber = guestSearch.roomNumber + number
    const input = clean ? number : newNumber
    setGuestSearch({ ...guestSearch, roomNumber: input })
  }

  const handleDownload = async () => {
    setIsSubmitting(false)
    const guestName = await handleSubmit(guestSearch)
    setGuestSearch({
      ...guestSearch,
      checkNumber: String(checkNumber),
      guestName,
    })
    setIsSubmitting(guestName === t('clientNotFound') ? undefined : true)
  }

  return (
    <Paper>
      <div>
        <div>
          <label htmlFor="checkNumber">Check Number</label>
          <input
            id="checkNumber"
            name="checkNumber"
            defaultValue={checkNumber || guestSearch.checkNumber}
          />
          <br />
          <label htmlFor="roomNumber">{t('roomNumber')}</label>
          <input
            id="roomNumber"
            name="roomNumber"
            value={guestSearch.roomNumber}
            onChange={(e) => {
              const { value } = e.target
              const input = value.replace(/[^0-9]/g, '')
              setGuestSearch({
                ...guestSearch,
                roomNumber: input,
              })
            }}
            disabled={false}
          />
          <br />
          <label htmlFor="guestName">{t('guestName')}</label>
          <input
            id="guestName"
            name="guestName"
            defaultValue={guestSearch.guestName}
          />
          <br />
          <div style={{ marginLeft: '15px' }}>
            <div>
              <button
                className="btn"
                disabled={isSubmitting === false}
                onClick={handleDownload}
                color="primary"
              >
                {isSubmitting === false ? 'Buscando' : 'Buscar'}
              </button>
            </div>
            <div>
              <button
                className="btn"
                disabled={!isSubmitting}
                onClick={() => {
                  onClose(guestSearch)
                }}
              >
                {'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <NumericKeyboard text={text} />
      </div>
    </Paper>
  )
}

export default Home
