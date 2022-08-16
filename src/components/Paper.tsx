import { FC } from 'react'
const Paper: FC = ({ children }) => {
  return (
    <div className="bg-white flex" style={{padding: '30px', minWidth: '800px'}}>
        {children}
    </div>
  )
}

export default Paper
