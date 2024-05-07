
const express = require('express');
const leaveRoutes = require('./routes/leave.routes');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
app.use(cors());


//DB connection
require('dotenv').config({ path: '../.env' });
console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
	console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
	console.log("mongodb failed with", err);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/leaves', leaveRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
  });
}

module.exports = app;