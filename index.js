//express - server
import express from 'express';
import { Db, MongoClient } from 'mongodb';
import dotenv from "dotenv" ;

dotenv.config();
//const express = require('express');
const app = express();
const PORT = 5000;///any number

//Tell express what format data you are going to get - json,xml,txt
// middleware - gatekeeper
// all the request -body - willbe converted to json
app.use(express.json());
//express.json() - inbuild middleware
//3rd party & custom middleware

console.log(process.env)

async function createConnection() {

     //const MONGO_URL = "mongodb://localhost/user";

     //password - url - hide the url
    // const MONGO_URL = "mongodb+srv://Mohan:Mohan111@cluster0.lhcbx.mongodb.net/users";
    const MONGO_URL = process.env.MONGO_URL;

    const client = new MongoClient(MONGO_URL);

    //it will return promises, it as to use .then or async await 
    await client.connect();
    console.log("Successfully Connected!!!");
    // const insertdata = await client.db("users").collection("people").insertMany(users)


    return client;


    // // db.people.find({})
    // const user = await client.db("users").collection("people").findOne({ id: "5" })

    // console.log(user);
}


app.get('/', (request, response) => {
    response.send("hello all!!")
});


// app.get('/users/:id', (request, response) => {
//     console.log(request.params);
//     const { id } = request.params;
//     response.send(users.filter((user) => user.id == id));
// });

app.get('/users/:id', async (request, response) => {
    console.log(request.params);
    const { id } = request.params;

    const client = await createConnection();
    const user = await client
        .db("users")
        .collection("people")
        .findOne({ id: id })

    console.log(user);
    response.send(user);
});

app.get('/users', async (request, response) => {

    const client = await createConnection();
    const users = await client
        .db("users")
        .collection("people")
        .find({})
        .toArray();

    console.log(users);
    response.send(users);
});

//Create user
app.post('/users', async (request, response) => {
    // const { color, ageGt } = request.query;
    // console.log(request.query, color, ageGt);

    const client = await createConnection();
    const addUsers = request.body;

    const result = await client
        .db("users")
        .collection("people")
        .insertMany(addUsers)

    console.log(addUsers, result);
    response.send(result);

});

//delete
app.delete('/users/:id', async (request, response) => {
    console.log(request.params);
    const { id } = request.params;

    const client = await createConnection();
    const user = await client
        .db("users")
        .collection("people")
        .deleteOne({ id: id })

    console.log(user);
    response.send(user);
});

//PATCH/update
//need - id = identify the person, new data (new color)
//PUT - replace, PATCH - update
app.patch('/users/:id', async (request, response) => {
    console.log(request.params);
    const { id } = request.params;

    const client = await createConnection();
    const newData = request.body;
    console.log(id, request.body)

    const user = await client
        .db("users")
        .collection("people")
        .updateOne({ id: id }, { $set: newData });

    console.log(user);
    response.send(user);
});

app.listen(PORT, () => console.log("The server started", PORT))