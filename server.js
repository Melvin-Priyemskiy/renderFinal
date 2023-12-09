
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const path = require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5669074',
    password: 'vQ2NDuY21i',
    database: 'sql5669074'
});

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});



app.get('/', async (req, res) => {
    // connection.connect();
 
     connection.query('SELECT * FROM budget', function (error, results, fields) {
         connection.end();
         if (error) throw error;
         res.json(results)
 
     });
 });


app.post('/api/createaccount', (req, res) => {
    const { username, password } = req.body;
    console.log('This is me',username, password);
    res.json({data: 'it works'});

    
    connection.query('INSERT INTO users VALUES ("", ?, ?)', [username, password], function (error, results, fields) {
          if (error) throw error;
      });    
});

app.post('/api/loginpage', (req, res) => {
    const { username, password } = req.body;
    console.log('This is me',username, password);

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(results.length);
        console.log(results[0]);
        console.log(results[0].id);


          

    });

    });