import React, { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from './api';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import SearchBar from './components/SearchBar';

function App() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');

    const showNotice = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(''), 3000);
    };


    const loadEmployees = async () => {
        try {
            setLoading(true);
            const res = await fetchEmployees(searchTerm);
            setEmployees(res.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            loadEmployees();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleFormSubmit = async (data) => {
        try {
            if (editingEmployee) {
                await updateEmployee(editingEmployee.id, data);
                showNotice('Employee updated successfully!');
                setEditingEmployee(null);
            } else {
                await createEmployee(data);
                showNotice('Employee added successfully!');
            }
            loadEmployees();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Something went wrong';
            alert(errorMsg);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (!confirmDelete) return;

        try {
            await deleteEmployee(id);
            showNotice('Employee deleted successfully.');
            loadEmployees();
        } catch (err) {
            alert('Failed to delete employee');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">


                <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Employee Directory
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your team members, roles, and records in one place.
                    </p>
                </header>


                {notification && (
                    <div className="mb-6 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg border border-emerald-200">
                        {notification}
                    </div>
                )}


                <EmployeeForm
                    onSubmit={handleFormSubmit}
                    editingEmployee={editingEmployee}
                    onCancelEdit={() => setEditingEmployee(null)}
                />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <p className="text-sm font-medium text-slate-600">
                        Total Records: <span className="font-semibold text-slate-900">{employees.length}</span>
                    </p>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                <EmployeeTable
                    employees={employees}
                    onEdit={(emp) => {
                        setEditingEmployee(emp);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onDelete={handleDelete}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default App;