import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, editingEmployee, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [error, setError] = useState('');


    useEffect(() => {
        if (editingEmployee) {
            setFormData({
                name: editingEmployee.name,
                email: editingEmployee.email,
                role: editingEmployee.role
            });
        } else {
            setFormData({ name: '', email: '', role: '' });
        }
        setError('');
    }, [editingEmployee]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation

        if (!formData.name.trim() || !formData.email.trim() || !formData.role.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        onSubmit(formData);

        // Reset if adding new

        if (!editingEmployee) {
            setFormData({ name: '', email: '', role: '' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
                {editingEmployee ? 'Edit Employee Details' : 'Add New Employee'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Alex Johnson"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="e.g. alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Job Role</label>
                    <input
                        type="text"
                        name="role"
                        placeholder="e.g. Frontend Developer"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="md:col-span-3 flex items-center gap-3 mt-2">
                    <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                    >
                        {editingEmployee ? 'Save Changes' : 'Add Employee'}
                    </button>

                    {editingEmployee && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;