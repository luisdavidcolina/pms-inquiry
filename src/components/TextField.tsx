const TextField = (props: any) => {
  return (
    <span>
      <input
        InputLabelProps={{ shrink: true }}
        disabled
        fullWidth
        {...props}
      />
    </span>
  )
}

export default TextField
