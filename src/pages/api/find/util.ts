export const convertJSON = (xml: any, room: any) => {
  const date = String(xml.Transacction.DOB).substring(0, 10)
  const account = xml.Transacction.CheckNumber
  const name = xml.Transacction.RevenueCenter
  const pos = name === 'RESTAURANT' ? '1' : '2'

  const { Items } = xml.Transacction
  let Item = []
  if (Array.isArray(Items.Item)) Item = [...Items.Item]
  else Item = [Items.Item]
  const items = Item.map((item: any) => {
    return {
      pos,
      name,
      date,
      account,
      product: item.ItemName,
      price: item.ItemPrice,
      hab: room,
    }
  })

  return items
}

export default convertJSON
