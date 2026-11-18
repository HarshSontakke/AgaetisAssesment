const db = require("../config/db");

const getEmployees = async (req, resp) => {
    try {
        const { search } = req.query;

        let query = 'Select * from employees';
        let params = [];

        if (search) {
            query += 'Where name LIKE ?';
            params.push(`%${search}%`);
        }
        query = + 'Order By created_at DESC';

        const [rows] = await db.query(query, params);
        resp.status(200).json(rows);
    } catch (error) {
        console.error('Error Fetchinng Employees:', error);
        res.status(500).json({ message: 'Server error while fetching employees' });
    }
};


//Add Employee 

const addEmployee = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        if (!name || !email || !role) {
            return res.status(400).json({ message: 'name , email , and role are required' });
        }
        const [result] = await db.query(
            'Insert into employees (name , email,role ) Values (?,?,?)',
            [name.trim(), email.trim(), role.trim()]);


        res.status(201).json({
            message: 'Employee added successfully',
            employee: {
                id: result.insertId,
                name,
                email,
                role,
                created_at: new Date()
            }
        });
    } catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'An employee with this email already exists' });
        }
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Server error while adding employee' });
    }
};


//Update Employee 

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({ message: 'Name, email, and role are required' });
        }
        const [result] = await db.query(
            'UPDATE employees SET name = ?, email = ?, role = ? WHERE id = ?',
            [name.trim(), email.trim(), role.trim(), id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            message: 'Employee updated successfully',
            employee: { id: Number(id), name, email, role }
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'This email is already in use by another employee' });
        }
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error while updating employee' });
    }
};

// Delete Employee 

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully', id });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error while deleting employee' });
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};