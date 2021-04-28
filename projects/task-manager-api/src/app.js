const express = require('express');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken')

require('./db/mongoose');
/*HEADERS to work authrorization */
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//     res.header('Access-Control-Expose-Headers', 'Authorization')
//     next();
// });

app.use(cors());

const userRoute = require('./routes/user');
const listRoute = require('./routes/lists');
const taskRoute = require('./routes/task');

app.use(express.json());
/* another set of headers */
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin,Authorization, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

/*HEADERS USING CORS */
// app.use(cors(
//     { credentials: true, origin: true }
// ))


app.use(userRoute)
app.use(listRoute)
app.use(taskRoute)


app.listen(3000, () => {
    console.log('server is up and running');
})