'use strict';

const express = require('express')
const mysql = require('mysql')

// Constants
const PORT = 3000
const HOST = `0.0.0.0`

// App
const app = express()

const db = mysql.createConnection({
    host: `mysql`,
    user: `root`,
    password: `maud`,
    database: `my-db`,
})

let response = null
let hasCreatedDatabase = false

app.get(`/`, async (req, res) => {
    response = res
    if(!hasCreatedDatabase)
        createDatabaseAndUpdateCounter(response)
    else
        updateCounter(response)
})

const createDatabaseAndUpdateCounter = response => {
    db.query(`DROP TABLE IF EXISTS counter`, (err, result1) => {
        if(err)
            console.log(err)
        else{
            db.query(`CREATE TABLE IF NOT EXISTS counter (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, number int NOT NULL)`, (err, result2) => {
                if(err)
                    console.log(err)
                else{
                    hasCreatedDatabase = true
                    updateCounter(response)
                }
            })
        }
    })
}

const updateCounter = response => {
    db.query(`INSERT INTO counter(number) VALUES (0)`, (err, results, fields) => {
        if(err)
            console.log(err)
        else{
            console.log(results)
            response.send(`Hello to my sample NodeJS app, I have been seen ${results.insertId} times`)
        }
    })
}

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`)
})