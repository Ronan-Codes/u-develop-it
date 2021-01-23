const sqlite3 = require("sqlite3").verbose();
const express = require("express");

// Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware (true on last assignment) !! REVIEW !!
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database.');
});

// ------------------------------

    /* THIS IS JUST TO TEST CONNECTION AT BEGINNING
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World'
        });
    });
    */

// Replaced by Get all candidates api call below
/*
db.all(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
})
*/

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Replaced by Get single candidate api call below
/*
// Get a single candidate
db.get(`SELECT * FROM candidates WHERE id = 6`, (err, row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
});
*/

// Get single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates
                WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }

        res.json({
            message: 'success',
            data: row
        });
    });
});


/*
// Replaced by Deleta a candidate API call below
db.run(`DELETE FROM candidates WHERE id = ?`, 6, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result, this, this.changes);
  });
*/

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({error: res.message});
            return;
        }

        res.json({
            message: 'succesfully deleted',
            changes: this.changes
        });
    });
});

/*
// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];

// ES5 function, not arrow function, to use this
db.run(sql, params, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this.lastID);
});
*/

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});


// ------------------------------

// Start server after DB connection
    // function that will start the Express.js server on port 3001.
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
// Always at the bottom of the server.js file
