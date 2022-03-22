require('dotenv').config();

const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

const ConnectDB = require('./config/database');
ConnectDB();

app.use(express.json());

const routers = require('./routes/index');

app.use('/api', routers);

app.listen(
  process.env.PORT,
  console.log(`Server is running at port: ${process.env.PORT}`)
);
