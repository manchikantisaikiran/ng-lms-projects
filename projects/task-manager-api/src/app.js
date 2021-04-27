const express = require('express');
const app = express();

require('./db/mongoose');
// const List = require('./db/models/list');
// const Task = require('./db/models/task');
// const User = require('./db/models/user')

const userRoute = require('./routes/user');
const listRoute = require('./routes/lists');
const taskRoute = require('./routes/task');

app.use(express.json());
app.use(userRoute)
app.use(listRoute)
app.use(taskRoute)
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header(
//         'Access-Control-Expose-Headers',
//         'x-access-token, x-refresh-token'
//     );
//     next();
// });

// let authenticate = (req, res, next) => {
//     let token = req.header('x-access-token');

//     // verify the JWT
//     jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
//         if (err) {
//             // there was an error
//             // jwt is invalid - * DO NOT AUTHENTICATE *
//             res.status(401).send(err);
//         } else {
//             // jwt is valid
//             req.user_id = decoded._id;
//             next();
//         }
//     });
// }

// // Verify Refresh Token Middleware (which will be verifying the session)
// let verifySession = (req, res, next) => {
//     // grab the refresh token from the request header
//     let refreshToken = req.header('x-refresh-token');

//     // grab the _id from the request header
//     let _id = req.header('_id');

//     User.findByIdAndToken(_id, refreshToken).then((user) => {
//         if (!user) {
//             // user couldn't be found
//             return Promise.reject({
//                 'error': 'User not found. Make sure that the refresh token and user id are correct'
//             });
//         }


//         // if the code reaches here - the user was found
//         // therefore the refresh token exists in the database - but we still have to check if it has expired or not

//         req.user_id = user._id;
//         req.userObject = user;
//         req.refreshToken = refreshToken;

//         let isSessionValid = false;

//         user.sessions.forEach((session) => {
//             if (session.token === refreshToken) {
//                 // check if the session has expired
//                 if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
//                     // refresh token has not expired
//                     isSessionValid = true;
//                 }
//             }
//         });

//         if (isSessionValid) {
//             // the session is VALID - call next() to continue with processing this web request
//             next();
//         } else {
//             // the session is not valid
//             return Promise.reject({
//                 'error': 'Refresh token has expired or the session is invalid'
//             })
//         }

//     }).catch((e) => {
//         res.status(401).send(e);
//     })
// }

// /* END MIDDLEWARE  */


// app.get('/lists', authenticate, async (req, res) => {
//     try {
//         const lists = await List.find({
//             userId: req.userId,
//         });
//         if (!lists) throw new Error('lists not found')
//         res.send(lists);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

// app.get('/lists/:listId', async (req, res) => {
//     try {
//         const list = await List.findOne({
//             _id: req.params.listId,
//         })
//         if (!list) throw new Error('no list found!');
//         res.send(list);
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.post('/lists', async (req, res) => {
//     const list = new List(req.body);
//     try {
//         await list.save();
//         res.send(list);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

// app.patch('/lists/:id', async (req, res) => {
//     try {
//         const updatedUser = await List.findOneAndUpdate({ _id: req.params.id }, {
//             $set: req.body
//         })
//         if (!updatedUser) throw new Error('no user found to update');
//         res.send('updated succesfully!');
//     } catch (e) {
//         res.status(400).send(e);
//     }

// })

// app.delete('/lists/:id', async (req, res) => {
//     try {
//         const list = List.findOneAndRemove({
//             _id: req.params.id
//         })
//         if (!list) throw new Error('no user found to delete!');
//         res.send('deleted succesfully!');
//         deleteTasksFromList(list._id);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

// app.get('/lists/:listId/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({
//             listId: req.params.listId
//         })
//         if (!tasks) throw new Error('something went wrong!');
//         res.send(tasks);
//     } catch (e) {
//         res.status.send(e)
//     }
// })

// app.get('/lists/:listId/tasks/:taskId', async (req, res) => {
//     try {
//         const task = await Task.findOne({
//             _id: req.params.taskId,
//             listId: req.params.listId
//         })
//         if (!task) throw new Error('no task found!');
//         res.send(task);
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.post('/lists/:listId/tasks', async (req, res) => {
//     try {
//         const task = new Task({
//             ...req.body,
//             listId: req.params.listId
//         });
//         await task.save();
//         if (!task) throw new error('something went wrong!');
//         res.send(task);
//     } catch (e) {
//         res.status.send(e)
//     }
// })

// app.patch('/lists/:listId/tasks/:taskId', async (req, res) => {
//     try {
//         const updatedTask = await Task.findOneAndUpdate({
//             _id: req.params.taskId,
//             listId: req.params.listId
//         }, {
//             $set: req.body
//         });
//         res.send(updatedTask);
//     } catch (e) {
//         res.status.send(e)
//     }
// })

// app.delete('/lists/:listId/task/:taskId', async (req, res) => {
//     try {
//         await Task.findOneAndDelete({
//             _id: req.params.taskId,
//             listId: req.params.listId
//         });
//         res.send('deleted succesfully!');
//     } catch (e) {
//         res.status.send(e);
//     }
// })


// /* USER ROUTES */

// /**
//  * POST /users
//  * Purpose: Sign up
//  */
// app.post('/users', (req, res) => {
//     // User sign up

//     let body = req.body;
//     let newUser = new User(body);

//     newUser.save().then(() => {
//         return newUser.createSession();
//     }).then((refreshToken) => {
//         // Session created successfully - refreshToken returned.
//         // now we geneate an access auth token for the user

//         return newUser.generateAccessAuthToken().then((accessToken) => {
//             // access auth token generated successfully, now we return an object containing the auth tokens
//             return { accessToken, refreshToken }
//         });
//     }).then((authTokens) => {
//         // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
//         res
//             .header('x-refresh-token', authTokens.refreshToken)
//             .header('x-access-token', authTokens.accessToken)
//             .send(newUser);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// })


// /**
//  * POST /users/login
//  * Purpose: Login
//  */
// app.post('/users/login', (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;

//     User.findByCredentials(email, password).then((user) => {
//         return user.createSession().then((refreshToken) => {
//             // Session created successfully - refreshToken returned.
//             // now we geneate an access auth token for the user

//             return user.generateAccessAuthToken().then((accessToken) => {
//                 // access auth token generated successfully, now we return an object containing the auth tokens
//                 return { accessToken, refreshToken }
//             });
//         }).then((authTokens) => {
//             // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
//             res
//                 .header('x-refresh-token', authTokens.refreshToken)
//                 .header('x-access-token', authTokens.accessToken)
//                 .send(user);
//         })
//     }).catch((e) => {
//         res.status(400).send(e);
//     });
// })


// /**
//  * GET /users/me/access-token
//  * Purpose: generates and returns an access token
//  */
// app.get('/users/me/access-token', verifySession, (req, res) => {
//     // we know that the user/caller is authenticated and we have the user_id and user object available to us
//     req.userObject.generateAccessAuthToken().then((accessToken) => {
//         res.header('x-access-token', accessToken).send({ accessToken });
//     }).catch((e) => {
//         res.status(400).send(e);
//     });
// })



// /* HELPER METHODS */
// let deleteTasksFromList = (_listId) => {
//     Task.deleteMany({
//         _listId
//     }).then(() => {
//         console.log("Tasks from " + _listId + " were deleted!");
//     })
// }


app.listen(4000, () => {
    console.log('server is up and running');
})