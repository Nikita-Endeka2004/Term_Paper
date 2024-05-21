import { FC, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ITransaction } from '../types/types';
import { format, parseISO } from 'date-fns';

interface IData {
  expense: number
  income: number
  name: string
}

interface IStackedAreaChart {
  transactions: ITransaction[]
}

const StackedAreaChart: FC<IStackedAreaChart> = ({transactions}) => {
  const data: IData[] = useMemo(() => {
    const expencesByMonth: { [key: string]: number } = {};
    const incomesByMonth: { [key: string]: number } = {};

    transactions.forEach(transaction => {
      const month = format(parseISO(transaction.createdAt), 'MMMM yyyy');
      
      if (transaction.type === 'expense') {
        if (!expencesByMonth[month]) {
          expencesByMonth[month] = 0;
        }
        expencesByMonth[month] += transaction.amount;
      } else if (transaction.type === 'income') {
        if (!incomesByMonth[month]) {
          incomesByMonth[month] = 0;
        }
        incomesByMonth[month] += transaction.amount;
      }
    });

    const resultData: IData[] = [];

    const allMonths = new Set([...Object.keys(expencesByMonth), ...Object.keys(incomesByMonth)]);

    allMonths.forEach(month => {
      resultData.push({
        name: month,
        expense: expencesByMonth[month] || 0,
        income: incomesByMonth[month] || 0,
      });
    });

    resultData.push({
      name: 'April 2024',
      expense: 2000,
      income: 5000,
    });

    resultData.push({
      name: 'January 2024',
      expense: 4000,
      income: 3500,
    });

    return resultData;
  }, [transactions]);
  return (
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="expense" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="income" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  )
}

export default StackedAreaChart
