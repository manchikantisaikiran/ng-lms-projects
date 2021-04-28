const jwt = require('jsonwebtoken')
const User = require('../db/models/user')
const jwtSecret = require('../constants')

const auth = async (req, res, next) => {
    // console.log(req.header('Authorization'));
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, jwtSecret);
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        if (!user)
            throw new Error()

        req.token = token
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error: 'please autenticate' })
    }
}

module.exports = auth