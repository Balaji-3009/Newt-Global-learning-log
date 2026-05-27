import React,
{
    useEffect,
    useState
}
from 'react';

import {
    getTransactions,
    deleteTransaction
}
from '../services/api';

import {

    PieChart,
    Pie,
    Cell,

    Tooltip,

    Legend,

    BarChart,
    Bar,

    XAxis,
    YAxis,

    CartesianGrid,

    ResponsiveContainer

}
from 'recharts';

function Dashboard() {

    const [transactions,
        setTransactions] =
        useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions =
        async () => {

        const response =
            await getTransactions();

        setTransactions(response.data);
    };

    const removeTransaction =
        async (id) => {

        await deleteTransaction(id);

        fetchTransactions();
    };

    const income =
        transactions
            .filter(t =>
                t.type === 'INCOME')
            .reduce((a, b) =>
                a + b.amount, 0);

    const expense =
        transactions
            .filter(t =>
                t.type === 'EXPENSE')
            .reduce((a, b) =>
                a + b.amount, 0);

    const balance =
        income - expense;

    const categoryData = [];

    const categoryMap = {};

    transactions
        .filter(t => t.type === 'EXPENSE')
        .forEach(transaction => {

            if (
                categoryMap[transaction.category]
            ) {

                categoryMap[
                    transaction.category
                ] += transaction.amount;

            } else {

                categoryMap[
                    transaction.category
                ] = transaction.amount;
            }
        });

    for (const category in categoryMap) {

        categoryData.push({

            name: category,

            value: categoryMap[category]
        });
    }

    const incomeExpenseData = [

        {
            name: 'Income',
            amount: income
        },

        {
            name: 'Expense',
            amount: expense
        }
    ];

    const COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#AF19FF'
    ];

    return (

        <div className='container mt-5'>

            <h2>Expense Dashboard</h2>

            <div className='row mt-4'>

                <div className='col-md-4'>

                    <div className='card p-3'>

                        <h5>Total Income</h5>

                        <h3>
                            ₹ {income}
                        </h3>

                    </div>

                </div>

                <div className='col-md-4'>

                    <div className='card p-3'>

                        <h5>Total Expense</h5>

                        <h3>
                            ₹ {expense}
                        </h3>

                    </div>

                </div>

                <div className='col-md-4'>

                    <div className='card p-3'>

                        <h5>Balance</h5>

                        <h3>
                            ₹ {balance}
                        </h3>

                    </div>

                </div>

            </div>
            <div className='row mt-5'>

                <div className='col-md-6'>

                    <div className='card p-4'>

                        <h4>
                            Expense Categories
                        </h4>

                        <ResponsiveContainer
                            width='100%'
                            height={300}
                        >

                            <PieChart>

                                <Pie

                                    data={categoryData}

                                    dataKey='value'

                                    nameKey='name'

                                    outerRadius={100}

                                    label
                                >

                                    {
                                        categoryData.map(
                                            (entry, index) => (

                                            <Cell

                                                key={`cell-${index}`}

                                                fill={
                                                    COLORS[
                                                    index %
                                                    COLORS.length
                                                    ]
                                                }
                                            />
                                        ))
                                    }

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                <div className='col-md-6'>

                    <div className='card p-4'>

                        <h4>
                            Income vs Expense
                        </h4>

                        <ResponsiveContainer
                            width='100%'
                            height={300}
                        >

                            <BarChart
                                data={incomeExpenseData}
                            >

                                <CartesianGrid
                                    strokeDasharray='3 3'
                                />

                                <XAxis dataKey='name' />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey='amount'
                                    fill='#8884d8'
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>
            <table
                className=
                'table table-bordered mt-5'
            >

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        transactions.map(
                            transaction => (

                            <tr
                                key=
                                {transaction.id}
                            >

                                <td>
                                    {transaction.title}
                                </td>

                                <td>
                                    ₹ {transaction.amount}
                                </td>

                                <td>
                                    {transaction.type}
                                </td>

                                <td>
                                    {transaction.category}
                                </td>

                                <td>
                                    {transaction.date}
                                </td>

                                <td>

                                    <button

                                        className=
                                        'btn btn-danger'

                                        onClick={() =>
                                            removeTransaction(
                                                transaction.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;