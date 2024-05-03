import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/pngegg.png'

interface Props {
  children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({children}) => {
  const isAuth = useAuth()
  return (
    <>
      {
        isAuth ? children : <div className='flex flex-col justify-center items-center mt-20 gap-10'>
          <img className='w-1/2 mt-20' src={img} alt="img" />
          <h1 className='text-2xl'>To view this page you must be logged in</h1>
        </div>
      }
    </>
  )
}
