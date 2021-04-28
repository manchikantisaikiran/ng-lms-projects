const express = require('express');
const cors = require('cors')
const app = express();

require('./db/mongoose');

app.use(cors());
app.use(express.json());
const userRoute = require('./routes/user');
const listRoute = require('./routes/lists');
const taskRoute = require('./routes/task');


app.use(userRoute)
app.use(listRoute)
app.use(taskRoute)


app.listen(3000, () => {
    console.log('server is up and running');
})