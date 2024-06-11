import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();


// Creating the connection to RDS Database
// Replace the following:
// process.env.MYSQL_HOST -> "YOUR_RDS_CONNECTION_ENDPOINT"
// process.env.MYSQL_USER -> "YOUR_RDS_USER_NAME"
// process.env.MYSQL_PASS -> "YOUR_RDS_DB_PASSWORD"
// process.env.MYSQL_DATABASE -> "YOUR_RDS_DB_NAME"

const connection = mysql.createPool({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'webapp_task'
}).promise();

// Fetching Records from the table
export async function getRecords() {
    const [records] = await connection.query("SELECT * from people");
    return records;
}

// Pushing new Record to the DB
export async function putRecord(name, age){
    const result = await connection.query(`
        INSERT INTO people(name, age)
        VALUES (?, ?)
    `, [name, age]);
    return result;
}

// Testing the putRecord
// const newPerson = await putRecord('Alice Kol', 23);
// console.log(newPerson);

// const people = await getRecords();
// console.log(people);