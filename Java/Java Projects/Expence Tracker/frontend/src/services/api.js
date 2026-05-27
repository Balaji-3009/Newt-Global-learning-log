import axios from 'axios';

const API =
    'http://localhost:8081/api';

export const registerUser =
    (user) =>
        axios.post(
            `${API}/auth/register`,
            user
        );

export const loginUser =
    (user) =>
        axios.post(
            `${API}/auth/login`,
            user
        );

export const getTransactions =
    () =>

        axios.get(
            `${API}/transactions`,
            {
                headers: {
                    Authorization:
                        `Bearer ${
                            localStorage
                            .getItem('token')
                        }`
                }
            }
        );

export const createTransaction =
    (transaction) =>

        axios.post(
            `${API}/transactions`,
            transaction,
            {
                headers: {
                    Authorization:
                        `Bearer ${
                            localStorage
                            .getItem('token')
                        }`
                }
            }
        );

export const deleteTransaction =
    (id) =>

        axios.delete(
            `${API}/transactions/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${
                            localStorage
                            .getItem('token')
                        }`
                }
            }
        );