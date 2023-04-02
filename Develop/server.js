const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const api = require('./routes');
const dbase = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

app.post('/api/notes', (req, res) => {
console.info(`${req.method} request received to add a note`);
const { title, text } = req.body;
if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text
    };
    const response = {
      status: 'success',
      body: newNote,
    };
    //console.log(response);
    // get db , combine new data with old data, send to db file.
    //const lol = JSON.stringify(dbase);
    console.log(dbase, response.body, 'this is the db');
    const newDB = dbase.push(response.body);
    console.log(JSON.parse(newDB));
    res.status(201).json(newDB);
    // fs.writeFile('./db/db.json',JSON.stringify(newDB), (err) =>
    // err ? console.log(err) : console.log('Page Created, Success!'));

  } else {
    res.status(500).json('Error in posting Note');
  }
});
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);