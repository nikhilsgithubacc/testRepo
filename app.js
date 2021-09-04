const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req, res, next) => {
    res.json({
        message: 'welcome to API'
    });
});

app.post('/api/login', (req, res, next) =>{
    const user = {
        id: 1,
        name: 'Nikhil',
        mobile: '987555555',
        email: 'nikhil@gmail.com'
    }

    //send the token with res
    jwt.sign({user}, 'secretKey', {expiresIn: '1m'} , (err, token) => { //30s
        res.json({
            token
        });
    })
});

app.post('/api/protected', verifyToken, (req, res, next) => {

    // verify the recieved token by adding verifyToken middleware on above line and  below function 
    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Protected',
                authData: authData
            });   
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
    // jwt.verify(bearer, 'secretKey', ()=>{

    // })
    // next();

}

const posrt = process.env.port || 5000
app.listen(port,() => console.log('server started on port 5000'));
