import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';

import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import ProjectsPage from './pages/ProjectsPage';
import AddTask from './pages/AddTask';

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path='/'
                    element={<Navigate to='/tasks' />}
                />

                <Route
                    path='/tasks'
                    element={<TasksPage />}
                />

                <Route
                    path='/users'
                    element={<UsersPage />}
                />

                <Route
                    path='/projects'
                    element={<ProjectsPage />}
                />

                <Route
                    path='/add'
                    element={<AddTask />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;