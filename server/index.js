const express = require('express');
const cors = require('cors');
const db = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/v1/api', require('./routes/todo.routes'));

app.listen(PORT, async (err) => {
  if (!err) {
    console.log(`Server listening on ${PORT}`);
  } else {
    console.log(err);
  }
});

db();
