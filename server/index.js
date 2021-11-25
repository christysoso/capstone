const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile').development); // import knex with db config
const PORT = 5050;

app.use(express.json());


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});