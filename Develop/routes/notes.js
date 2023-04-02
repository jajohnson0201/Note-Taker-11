const notes = require('express').Router();
const fs = require('fs');

notes.get('/notes',(req, res)=>{
    fs.readFile("../db/db").then((db)=>{
    console.log(db)
    res.json(JSON.parse(data))
})
})

module.exports = notes;