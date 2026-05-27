import React, { useState } from 'react';

import { createProject } from '../services/api';

function AddProject() {

    const [project, setProject] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {

        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await createProject(project);

        window.location.reload();
    };

    return (

        <div className='card p-4 mb-4'>

            <h4>Add Project</h4>

            <form onSubmit={handleSubmit}>

                <input
                    className='form-control mb-3'
                    placeholder='Project Name'
                    name='name'
                    onChange={handleChange}
                />

                <textarea
                    className='form-control mb-3'
                    placeholder='Description'
                    name='description'
                    onChange={handleChange}
                />

                <button className='btn btn-success'>
                    Add Project
                </button>

            </form>

        </div>
    );
}

export default AddProject;