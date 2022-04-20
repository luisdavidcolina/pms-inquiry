const calculateDOB = () => {
  const date = new Date()
  const zeroPad = (num: number) => {
    const places = 2
    const zero = places - num.toString().length + 1
    return Array(+(zero > 0 && zero)).join('0') + num
  }
  return `${date.getFullYear()}${zeroPad(date.getMonth() + 1)}${zeroPad(
    date.getDate(),
  )}`
}

export const DOB = calculateDOB()

export default DOB