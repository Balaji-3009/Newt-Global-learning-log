import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/api';
import AddTask from './AddTask';
import AddUser from './AddUser';
import AddProject from './AddProject';

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className='container mt-5'>

            <h2>Task Dashboard</h2>
            <AddTask />
            <table className='table table-bordered mt-4'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>User</th>
                        <th>Project</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        tasks.map(task => (
                            <tr key={task.id}>

                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>{task.user?.name}</td>
                                <td>{task.project?.name}</td>

                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() =>
                                            removeTask(task.id)
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