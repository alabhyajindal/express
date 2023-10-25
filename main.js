const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'contacts'));

app.get('/', (req, res) => {
  const query = 'SELECT name FROM contacts';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }

    const namesList = rows.map((row) => row.name);
    res.send(`<html><body><h1>Friends</h1><ul>${namesList.map(name => `<li>${name}</li>`).join('')}</ul></body></html>`);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

