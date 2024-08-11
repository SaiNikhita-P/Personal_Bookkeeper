

// import React from 'react';
// import { Line, Pie } from '@ant-design/charts';
// import moment from 'moment';

// function ChartComponent({ sortedTransactions }) {
//   // Format and sort transactions by date
//   const sortedData = [...sortedTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Calculate cumulative balance
//   const data = [];
//   let cumulativeBalance = 0;

//   sortedData.forEach(item => {
//     if (item.type === 'income') {
//       cumulativeBalance += item.amount;
//     } else if (item.type === 'expense') {
//       cumulativeBalance -= item.amount;
//     }
//     data.push({
//       date: moment(item.date).format('YYYY-MM-DD'), // Ensure date format is consistent
//       balance: cumulativeBalance,
//     });
//   });

//   // Calculate spending data
//   const spendingData = sortedTransactions
//     .filter(transaction => transaction.type === 'expense')
//     .reduce((acc, curr) => {
//       const existing = acc.find(item => item.tag === curr.tag);
//       if (existing) {
//         existing.amount += curr.amount;
//       } else {
//         acc.push({ tag: curr.tag, amount: curr.amount });
//       }
//       return acc;
//     }, []);

//   // Configuration for Line Chart (cumulative balance over time)
//   const config = {
//     data,
//     width: 600,
//     xField: 'date',
//     yField: 'balance',
//     smooth: true,
//     xAxis: {
//       type: 'time',
//       tickCount: 5,
//     },
//     yAxis: {
//       title: {
//         text: 'Balance',
//       },
//     },
//   };

//   // Configuration for Pie Chart (spending by tag)
//   const spendingConfig = {
//     data: spendingData,
//     width: 300,
//     autoFit: true,
//     angleField: 'amount',
//     colorField: 'tag',
//     radius: 0.8,
//   };

//   return (
//     <div className='charts-wrapper'>
//       <div className='chart-container'>
//         <h2 className='chart-title'>Your Analytics</h2>
//         <Line className='line-chart' {...config} />
//       </div>
//       <div className='chart-container'>
//         <h2 className='chart-title'>Your Spendings</h2>
//         <Pie className='pie-chart' {...spendingConfig} />
//       </div>
//     </div>
//   );
// }

// export default ChartComponent;
import React from 'react';
import { Line, Pie } from '@ant-design/charts';
import moment from 'moment';

function ChartComponent({ sortedTransactions }) {
  // Format and sort transactions by date
  const sortedData = [...sortedTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate cumulative balance
  const data = [];
  let cumulativeBalance = 0;

  sortedData.forEach(item => {
    const date = moment(item.date).format('YYYY-MM-DD'); // Ensure date format is consistent

    // Update cumulative balance
    if (item.type === 'income') {
      cumulativeBalance += item.amount;
    } else if (item.type === 'expense') {
      cumulativeBalance -= item.amount;
    }

    // Add each transaction's date and cumulative balance to the data
    data.push({
      date: moment(item.date).format('YYYY-MM-DD HH:mm:ss'), // Use precise timestamp to handle same-day transactions
      balance: cumulativeBalance,
    });
  });

  // Calculate spending data
  const spendingData = sortedTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.tag === curr.tag);
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push({ tag: curr.tag, amount: curr.amount });
      }
      return acc;
    }, []);

  // Configuration for Line Chart (cumulative balance over time)
  const config = {
    data,
    width: 600,
    xField: 'date',
    yField: 'balance',
    smooth: true,
    xAxis: {
      type: 'time',
      tickCount: 5,
    },
    yAxis: {
      title: {
        text: 'Balance',
      },
    },
  };

  // Configuration for Pie Chart (spending by tag)
  const spendingConfig = {
    data: spendingData,
    width: 300,
    autoFit: true,
    angleField: 'amount',
    colorField: 'tag',
    radius: 0.8,
  };

  return (
    <div className='charts-wrapper'>
      <div className='chart-container'>
        <h2 className='chart-title'>Your Analytics</h2>
        <Line className='line-chart' {...config} />
      </div>
      <div className='chart-container'>
        <h2 className='chart-title'>Your Spendings</h2>
        <Pie className='pie-chart' {...spendingConfig} />
      </div>
    </div>
  );
}

export default ChartComponent;
