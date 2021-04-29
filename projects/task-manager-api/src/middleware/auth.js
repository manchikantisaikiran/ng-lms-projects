const jwt = require('jsonwebtoken')
const User = require('../db/models/user')
const jwtSecret = require('../constants')
const axios = require('axios');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        req.token = token
        const decoded = jwt.verify(token, jwtSecret);
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        if (!user)
            throw new Error()

        req.user = user
        next()

    } catch (e) {
        if (e.message === 'jwt expired') {
            const user = await User.findOne({ 'tokens.token': req.token })
            if (user) {
                user.tokens = user.tokens.filter(tokenobj => req.token !== tokenobj.token)
                await user.save()
            }
        }
        res.status(401).send(e)
    }
}

module.exports = auth