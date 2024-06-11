import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { getRecords, putRecord } from './database.js';

const app = express();

app.use(express.json())

dotenv.config();

app.use(bodyParser.json({ limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("This is a API connecting to RDS Instance on AWS");
});

app.get("/people", async (req, res) => {
    const people = await getRecords();
    res.send(people);
});


app.post("/people", async (req, res) => {
    const {name, age} = req.body;
    const person = await putRecord(name, age);
    res.status(201).send(person);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});


app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`)
});