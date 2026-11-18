# Employee Directory

A full-stack Employee Directory app to manage employee records with add, view, edit, and delete functionality.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## Project Structure

```
AgaetisAssesment/
├── client/          # React frontend
├── server/          # Node.js + Express backend
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed
- MySQL installed and running

### 1. Clone the repo

```bash
git clone https://github.com/HarshSontakke/AgaetisAssesment.git
cd AgaetisAssesment
```

### 2. Set up the database

Login to MySQL and run the schema:

```bash
mysql -u root -p
source server/schema.sql
```

### 3. Configure environment variables

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_db
```

### 4. Start the backend

```bash
cd server
npm install
node app.js
```

Backend runs on `http://localhost:5000`

### 5. Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Fetch all employees |
| GET | `/employees?search=name` | Search employees by name |
| POST | `/employees` | Add a new employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

## Database Schema

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
