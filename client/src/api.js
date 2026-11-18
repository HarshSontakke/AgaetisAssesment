import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/employees'
});

export const fetchEmployees = (search = '') => API.get(`/?search=${search}`);

export const createEmployee = (employeeData) => API.post('/', employeeData);

export const updateEmployee = (id, employeeData) => API.put(`/${id}`, employeeData);

export const deleteEmployee = (id) => API.delete(`/${id}`);

export default API;