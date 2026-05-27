import axios from 'axios';

const TASK_URL = 'http://localhost:8081/api/tasks';
const USER_URL = 'http://localhost:8081/api/users';
const PROJECT_URL = 'http://localhost:8081/api/projects';

export const getTasks = () =>
    axios.get(TASK_URL);

export const createTask = (task) =>
    axios.post(TASK_URL, task);

export const deleteTask = (id) =>
    axios.delete(`${TASK_URL}/${id}`);

export const getUsers = () =>
    axios.get(USER_URL);

export const createUser = (user) =>
    axios.post(USER_URL, user);

export const getProjects = () =>
    axios.get(PROJECT_URL);

export const createProject = (project) =>
    axios.post(PROJECT_URL, project);