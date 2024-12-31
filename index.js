const express = require('express')
const pool = require('./db')
const dbQuery = require('./db')
const dotenv = require('dotenv')
const DB_conf = require('./db_config')

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        message:'Welcome to postgresql'
    })
})

app.get('/get-data',async(req,res)=>{
    try {
        const rows =await pool.query_maindb('SELECT * FROM person');
        // console.log(rows);
        
        res.status(200).send({
            message:'Data fetched',
            data:rows
        })
    } catch (error) {
        console.log(error);
        
    }
    
})


app.listen(4000,()=> console.log(`The app is running in the port 4000 ${DB_conf.DATABASE}`))