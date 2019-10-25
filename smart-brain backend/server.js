const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users:[
        {
            id : 1,
            name: "Ronit",
            email: "ronit@gmail.com",
            password:"khatrironit",
            entries: 0,
            date: new Date()
        },
        {
            id : 2,
            name: "Vinit",
            email: "vinit@gmail.com",
            password:"khatrivinit",
            entries: 0,
            date: new Date()
        }
]
};

app.get('/',(req,res)=>{
    res.json(database);
})
app.post('/signin',(req,res)=>{
    //const a =  JSON.parse(req.body);        

    if(req.body.email === database.users[0].email  
        && req.body.password === database.users[0].password){
            res.json('success');
        }else{
            res.json("access denied");
        }
})
app.post('/register',(req,res)=>{
    // bcrypt.hash(req.body.password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    database.users.push(
        {
            id : req.body.id,
            name: req.body.name,
            email: req.body.email,
            password:req.body.password,
            entries: 0,
            date: new Date()
        }
    );

    res.json(database.users[database.users.length - 1]);
})
app.get('/profile/:id',(req,res)=>{
    database.users.forEach(user=>{
        if(user.id == req.params.id){
            return res.json("welcome!! "+user.name);
        }
    })
    res.status(404).json("fuck oofffffff!!!!");
})
app.put('/image',(req,res)=>{
    database.users.forEach(user=>{
        if(user.id == req.body.id){
            user.entries++;
            res.json(user.entries);
        }
    })
    res.status(404).json("not found fuckofffff!!");
})


app.listen(3000,()=>{
    console.log("app is running perfectly");
})


/*
/-->it's working
/signinform-->POST=success/failure
/register--Post = user
/profile-->GET=user
/image-->PUT
*/
// bcrypt.compare("bacon", $2a$10$ss0RG3w4qTArq8x5aru68ebOnqm/XGqbGZ4Z7MFQr4VB35p.YSQmO, function(err, res) {
        //     // res == true
        // });
        // bcrypt.compare("veggies", $2a$10$ss0RG3w4qTArq8x5aru68ebOnqm/XGqbGZ4Z7MFQr4VB35p.YSQmO, function(err, res) {
        //     // res = false
        // });