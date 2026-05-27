import React, { useEffect, useState } from 'react';

import { getProjects } from '../services/api';

import AddProject from './AddProject';

function ProjectsPage() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {

        const response = await getProjects();

        setProjects(response.data);
    };

    return (

        <div className='container mt-4'>

            <AddProject />

            <div className='card p-4'>

                <h3>Projects</h3>

                <table className='table table-bordered'>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            projects.map(project => (

                                <tr key={project.id}>

                                    <td>{project.name}</td>

                                    <td>{project.description}</td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ProjectsPage;