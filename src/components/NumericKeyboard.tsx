interface NumericKeyboardProps {
  text: (number: string) => void
}

const NumericKeyboard = (props: NumericKeyboardProps) => {
  const { text } = props
  const numbers = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', ''],
  ]
  return (
    <div>
      {numbers.map((number, i) => (
        <div key={i}>
          {number.map((subNumber, j) => (
            <button
              className="btn  btn-lg m-1 btn-outline"
              key={j}
              onClick={() => {
                text(subNumber)
              }}
            >
              {subNumber}
              {subNumber === '' && 'Borrar'}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default NumericKeyboard
