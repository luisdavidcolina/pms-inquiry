import { FC } from 'react'
const Paper: FC = ({ children }) => {
  return (
    <div style={{padding: '30px', minWidth: '700px'}}>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Paper
