import { FC } from 'react'
import { instance } from '../api/axios.api'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import SimpleLineChart from '../components/SimpleLineChart'
import { useLoaderData } from 'react-router-dom'
import StackedAreaChart from '../components/StackedAreaChart'
import SimpleBarChart from '../components/SimpleBarChart'

export const HomeLoader = async () => {
  const transactions = await instance.get<ITransaction[]>('/transactions')
  const data = {
    transactions: transactions.data,
  }
  return data
}

const Home: FC = () => {
  const {transactions} = useLoaderData() as IResponseTransactionLoader 
  return (
  <div className='mt-4 ml-[-120px]'>
    <p className='mb-4 text-xl indent-10'>
      This is a comprehensive program designed to help you manage and control your budget effectively. It functions similarly to the budgeting features provided by many banking services, which are typically automated. However, in this program, all data is manually entered by the user, providing more control and customization over your financial tracking and planning.
    </p>
    <div className='flex justify-center mb-4'>
      <div className='bg-slate-800 p-4 rounded-md w-full max-w-2xl'>
        <h1 className='text-white mb-2 text-lg text-center'>Schedule of expenses and income by month</h1>
        <div className='items-center ml-12'>
          <SimpleBarChart transactions={transactions} />
        </div>
      </div>
    </div>
    <div className='flex gap-4'>
      <div className='flex-1 bg-slate-800 p-4 rounded-md'>
        <h1 className='text-white mb-2 text-lg text-center'>Schedule of expenses and income by month</h1>
        <SimpleLineChart transactions={transactions} />
      </div>
      <div className='flex-1 bg-slate-800 p-4 rounded-md'>
        <h1 className='text-white mb-2 text-lg text-center'>Schedule of expenses and income by month</h1>
        <StackedAreaChart transactions={transactions} />
      </div>
    </div>
  </div>
  )
}

export default Home;
