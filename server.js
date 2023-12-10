
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const path = require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');
const secretKey = 'My super secret key';

const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
})

app.get('/api/menu', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success:true,
        myContent: 'Secret content that only logged in people can see.'
    });
});

app.use(function (err, req, res, next) {
    console.log(err.name === 'UnauthorizedError');
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success:false,
            officialError: err,
            err: "Username or password is wrong2"
        });
    }
    else{
        next(err);
    }
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


app.get('/', async (req, res) => {
     connection.query('SELECT * FROM budget', function (error, results, fields) {
         connection.end();
         if (error) throw error;
         res.json(results)
 
     });
 });


app.post('/api/createaccount', (req, res) => {
    const { username, password } = req.body;

    //make sure there there is no blank fields
    if (username.trim() === '' || password.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required.',
          });      
        } else {
        console.log('The string is not blank.');
      }

    //make sure there is no dup username that exists
    console.log('This is me',username, password);

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log("length is this: " + results.length);
        console.log(results[0]);

        for (let i = 0; i < results.length; i++) {
            var dbUsername = results[i].username;
            if(dbUsername == username)
            {
                return res.status(409).json({
                    success: false,
                    message: 'Username already exists. Choose a different username.',
                  });            
            }
        }
        res.json({
            success: true,
            message: 'Account Created Successfully'
          });   

    });

    connection.query('INSERT INTO users VALUES ("", ?, ?)', [username, password], function (error, results, fields) {
          if (error) throw error;
      });    

});

app.post('/api/loginpage', (req, res) => {
    const { username, password } = req.body;
    console.log('This is me',username, password);

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log("length is this: " + results.length);
        console.log(results[0]);

        var credientalsFalse = true;
        var dbID = 0

        for (let i = 0; i < results.length; i++) {
            var dbUsername = results[i].username;
            var dbPassword = results[i].password;
            if(dbUsername == username && dbPassword == password)
            {
                dbID = results[i].id;
                credientalsFalse = false;         
            }
        }
        if(credientalsFalse)
        {    res.status(401).json({
            success: false,
            message: 'Invalid username or password',
            token: null
          });
        }
        else{
            //implement the token to push it to the front end
            let token = jwt.sign({id: dbID, username: username }, secretKey, {expiresIn: '3m'});
            res.json({
                success: true,
                message: 'Login successful',
                token: token
            });
        }
    });
});