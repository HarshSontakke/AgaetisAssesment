import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete, loading }) => {
    if (loading) {
        return (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-sm shadow-sm">
                Loading employees...
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-sm shadow-sm">
                No employees found. Add one above to get started!
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6">Joined Date</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50/75 transition-colors">
                                <td className="py-4 px-6 font-medium text-slate-900">{emp.name}</td>
                                <td className="py-4 px-6 text-slate-600">{emp.email}</td>
                                <td className="py-4 px-6">
                                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                        {emp.role}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-slate-500 text-xs">
                                    {new Date(emp.created_at).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="py-4 px-6 text-right space-x-2">
                                    <button
                                        onClick={() => onEdit(emp)}
                                        className="px-3 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(emp.id)}
                                        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;