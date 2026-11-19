const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employee_db'
});

// Sample employees (used if MySQL is not running)
let employees = [
    { id: 1, name: 'Harsh Sontakke', email: 'harsh@gmail.com', role: 'Software Engineer', created_at: new Date() },
    { id: 2, name: 'Dheeraj Yadav', email: 'dheeraj@gmail.com', role: 'Qa Engineer', created_at: new Date() },
    { id: 3, name: 'Aditi Patil', email: 'aditi@gmail.com', role: 'Sap Engineer', created_at: new Date() },
    { id: 4, name: 'Krishna Singh', email: 'krsna@gmail.com', role: 'SaaS Engineer', created_at: new Date() },
    { id: 5, name: 'Rohit Tiwari', email: 'rohit@gmail.com', role: 'Ai Engineer', created_at: new Date() },
    { id: 6, name: 'Ashutosh', email: 'ashutosh@gmail.com', role: 'Software Engineer', created_at: new Date() }
];

let isConnected = false;

// Test connection
pool.getConnection()
    .then((conn) => {
        isConnected = true;
        console.log('Connected to MySQL successfully!');
        conn.release();
    })
    .catch(() => {
        console.log('Running with mock employee data (MySQL is offline)');
    });

// Query helper
const query = async (sql, params = []) => {
    // If MySQL is online, use MySQL
    if (isConnected) {
        return pool.query(sql, params);
    }

    const str = sql.toLowerCase();

    // 1. Get / Search employees
    if (str.includes('select')) {
        if (params.length > 0) {
            const search = params[0].replace(/%/g, '').toLowerCase();
            const filtered = employees.filter(e => e.name.toLowerCase().includes(search));
            return [filtered];
        }
        return [employees];
    }

    // 2. Add employee
    if (str.includes('insert')) {
        const [name, email, role] = params;
        const exists = employees.some(e => e.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            const err = new Error('Duplicate entry');
            err.code = 'ER_DUP_ENTRY';
            throw err;
        }
        const newEmp = { id: Date.now(), name, email, role, created_at: new Date() };
        employees.unshift(newEmp);
        return [{ insertId: newEmp.id }];
    }

    // 3. Update employee
    if (str.includes('update')) {
        const [name, email, role, id] = params;
        const emp = employees.find(e => e.id == id);
        if (emp) {
            emp.name = name;
            emp.email = email;
            emp.role = role;
            return [{ affectedRows: 1 }];
        }
        return [{ affectedRows: 0 }];
    }

    // 4. Delete employee
    if (str.includes('delete')) {
        const [id] = params;
        const before = employees.length;
        employees = employees.filter(e => e.id != id);
        return [{ affectedRows: before - employees.length }];
    }

    return [[]];
};

module.exports = { query };