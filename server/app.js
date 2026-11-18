const express = require('express');
const cors = require('cors');
require('dotenv').config();

const employeesRoutes = require ('./routes/employeeRoutes');

const app = express();

const PORT = process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());
app.use('/employees', employeesRoutes);
app.get('/',(req, resp)=>{
    resp.send('Employee Directory Is Running Properly !!')
});
app.listen(PORT,()=>{
    console.log(`Server Is Running On http://localhost:${PORT}`);
});

