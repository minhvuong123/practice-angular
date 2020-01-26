const express =  require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Global variables
app.set((req, res, next) => {
  next();
})

// Routes
app.use('/api/user', require('./routes/users'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Error Route
app.all('*', (req, res) => {
    res.status(404).json({
        error: true,
        message: "INVALID ROUTE"
    })
})

// settings
app.set('port', process.env.PORT || 4001);

// start server
app.listen(app.get('port'), () => console.log(`Server is running on PORT: ${app.get('port')}`));