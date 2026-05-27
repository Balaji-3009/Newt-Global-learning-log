import React,
{
    useState
}
from 'react';

import {
    createTransaction
}
from '../services/api';

import {
    useNavigate
}
from 'react-router-dom';

function AddTransaction() {

    const navigate =
        useNavigate();

    const [transaction,
        setTransaction] =
        useState({

        title: '',

        amount: '',

        type: 'EXPENSE',

        category: '',

        date: '',

        description: ''
    });

    const handleChange =
        (e) => {

        setTransaction({

            ...transaction,

            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        await createTransaction(
            transaction
        );

        navigate('/');
    };

    return (

        <div className='container mt-5'>

            <div className='card p-4'>

                <h2>Add Transaction</h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        className=
                        'form-control mb-3'

                        placeholder='Title'

                        name='title'

                        onChange=
                        {handleChange}
                    />

                    <input
                        type='number'

                        className=
                        'form-control mb-3'

                        placeholder='Amount'

                        name='amount'

                        onChange=
                        {handleChange}
                    />

                    <select
                        className=
                        'form-control mb-3'

                        name='type'

                        onChange=
                        {handleChange}
                    >

                        <option>
                            EXPENSE
                        </option>

                        <option>
                            INCOME
                        </option>

                    </select>

                    <input
                        className=
                        'form-control mb-3'

                        placeholder='Category'

                        name='category'

                        onChange=
                        {handleChange}
                    />

                    <input
                        type='date'

                        className=
                        'form-control mb-3'

                        name='date'

                        onChange=
                        {handleChange}
                    />

                    <textarea
                        className=
                        'form-control mb-3'

                        placeholder='Description'

                        name='description'

                        onChange=
                        {handleChange}
                    />

                    <button
                        className=
                        'btn btn-success'
                    >
                        Save Transaction
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddTransaction;