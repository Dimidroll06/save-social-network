const express = require('express');
const mongooseConnection = require('./db.js');
const { PORT, cookieSecret } = require('./lib/config.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser(cookieSecret));

// routes
app.use('/api', require('./routes/index.js'));
//

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});