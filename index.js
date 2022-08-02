const express = require('express');
const app = express();
const dotenv = require('dotenv');

//setup dotenv
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})