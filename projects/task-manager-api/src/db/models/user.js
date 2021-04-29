const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const List = require('./list')

const jwtSecret = require('../../constants')

/* FOR SESSION*/
// const userSchema = mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true
//     }, password: {
//         type: String,
//         required: true,
//         minlength: 8,
//     },
//     session: [{
//         token: {
//             type: String,
//             required: true
//         },
//         expiresAt: {
//             type: Number,
//             required: true
//         }
//     }]
// })

/* WITHOUT SESSIONS*/
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        trim: true,
        lowercase: true
    }, password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('password cannot contain "password"')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'author'
// })

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})

userSchema.pre('remove', async function (next) {
    await List.deleteMany({ userId: this._id })
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user)
        throw new Error('unable to login')
    // throw 'unable to login'

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
        throw new Error('unable to login')

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, jwtSecret, { expiresIn: "120000" })
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject.tokens
    delete userObject.password
    return userObject
}

const User = mongoose.model('User', userSchema);

module.exports = User;