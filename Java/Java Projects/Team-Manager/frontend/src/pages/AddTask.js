import React, { useEffect, useState } from 'react';

import {
    createTask,
    getUsers,
    getProjects
} from '../services/api';

function AddTask() {

    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'HIGH',
        userId: '',
        projectId: ''
    });

    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    const fetchProjects = async () => {
        const response = await getProjects();
        setProjects(response.data);
    };

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const taskData = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,

            user: {
                id: task.userId
            },

            project: {
                id: task.projectId
            }
        };

        await createTask(taskData);

        window.location.reload();
    };

    return (
        <div className='card p-4 mb-4'>

            <h4>Add Task</h4>

            <form onSubmit={handleSubmit}>

                <input
                    type='text'
                    className='form-control mb-3'
                    placeholder='Title'
                    name='title'
                    onChange={handleChange}
                />

                <textarea
                    className='form-control mb-3'
                    placeholder='Description'
                    name='description'
                    onChange={handleChange}
                />

                <select
                    className='form-control mb-3'
                    name='status'
                    onChange={handleChange}
                >
                    <option>TODO</option>
                    <option>IN_PROGRESS</option>
                    <option>DONE</option>
                </select>

                <select
                    className='form-control mb-3'
                    name='priority'
                    onChange={handleChange}
                >
                    <option>HIGH</option>
                    <option>MEDIUM</option>
                    <option>LOW</option>
                </select>

                <select
                    className='form-control mb-3'
                    name='userId'
                    onChange={handleChange}
                >
                    <option value=''>
                        Select User
                    </option>

                    {
                        users.map(user => (
                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </option>
                        ))
                    }
                </select>

                <select
                    className='form-control mb-3'
                    name='projectId'
                    onChange={handleChange}
                >
                    <option value=''>
                        Select Project
                    </option>

                    {
                        projects.map(project => (
                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.name}
                            </option>
                        ))
                    }
                </select>

                <button className='btn btn-primary'>
                    Add Task
                </button>

            </form>
        </div>
    );
}

export default AddTask;