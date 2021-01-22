const express = require("express");

// Add the PORT designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware (true on last assignment) !! REVIEW !!
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// ------------------------------

    /* THIS IS JUST TO TEST CONNECTION AT BEGINNING
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World'
        });
    });
    */



// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
});

// ------------------------------

// function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
// Always at the bottom of the server.js file
