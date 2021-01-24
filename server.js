// Connect to Database
const db = require('./db/database.js');

// Do I still need this here?
const inputCheck = require('./utils/inputCheck.js');

const express = require("express");

// Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware (true on last assignment) !! REVIEW !!
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to routes/apiRoutes (insert after const app)
const apiRoutes = require('./routes/apiRoutes/index.js');
app.use('/api', apiRoutes);



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

/*
// Replaced by Deleta a candidate API call below
db.run(`DELETE FROM candidates WHERE id = ?`, 6, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result, this, this.changes);
  });
*/

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

// routes for parties -----------------

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
