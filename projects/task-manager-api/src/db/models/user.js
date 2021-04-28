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
    const token = jwt.sign({ _id: this._id.toString() }, jwtSecret)
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

/* WITHOUT SESSION ENDS */

// // *** Instance methods ***

// userSchema.methods.toJSON = function () {
//     const user = this;
//     const userObject = user.toObject();

//     // return the document except the password and sessions (these shouldn't be made available)
//     return _.omit(userObject, ['password', 'sessions']);
// }

// userSchema.methods.generateAccessAuthToken = function () {
//     const user = this;
//     return new Promise((resolve, reject) => {
//         // Create the JSON Web Token and return that
//         jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
//             if (!err) {
//                 resolve(token);
//             } else {
//                 // there is an error
//                 reject();
//             }
//         })
//     })
// }

// userSchema.methods.generateRefreshAuthToken = function () {
//     // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
//     return new Promise((resolve, reject) => {
//         crypto.randomBytes(64, (err, buf) => {
//             if (!err) {
//                 // no error
//                 let token = buf.toString('hex');

//                 return resolve(token);
//             }
//         })
//     })
// }

// userSchema.methods.createSession = function () {
//     let user = this;

//     return user.generateRefreshAuthToken().then((refreshToken) => {
//         return saveSessionToDatabase(user, refreshToken);
//     }).then((refreshToken) => {
//         // saved to database successfully
//         // now return the refresh token
//         return refreshToken;
//     }).catch((e) => {
//         return Promise.reject('Failed to save session to database.\n' + e);
//     })
// }



// /* MODEL METHODS (static methods) */

// userSchema.statics.getJWTSecret = () => {
//     return jwtSecret;
// }



// userSchema.statics.findByIdAndToken = function (_id, token) {
//     // finds user by id and token
//     // used in auth middleware (verifySession)

//     const User = this;

//     return User.findOne({
//         _id,
//         'sessions.token': token
//     });
// }


// userSchema.statics.findByCredentials = function (email, password) {
//     let User = this;
//     return User.findOne({ email }).then((user) => {
//         if (!user) return Promise.reject();

//         return new Promise((resolve, reject) => {
//             bcrypt.compare(password, user.password, (err, res) => {
//                 if (res) {
//                     resolve(user);
//                 }
//                 else {
//                     reject();
//                 }
//             })
//         })
//     })
// }

// userSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
//     let secondsSinceEpoch = Date.now() / 1000;
//     if (expiresAt > secondsSinceEpoch) {
//         // hasn't expired
//         return false;
//     } else {
//         // has expired
//         return true;
//     }
// }


// /* MIDDLEWARE */
// // Before a user document is saved, this code runs
// userSchema.pre('save', function (next) {
//     let user = this;
//     let costFactor = 10;

//     if (user.isModified('password')) {
//         // if the password field has been edited/changed then run this code.

//         // Generate salt and hash password
//         bcrypt.genSalt(costFactor, (err, salt) => {
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 user.password = hash;
//                 next();
//             })
//         })
//     } else {
//         next();
//     }
// });


// /* HELPER METHODS */
// let saveSessionToDatabase = (user, refreshToken) => {
//     // Save session to database
//     return new Promise((resolve, reject) => {
//         let expiresAt = generateRefreshTokenExpiryTime();

//         user.sessions.push({ 'token': refreshToken, expiresAt });

//         user.save().then(() => {
//             // saved session successfully
//             return resolve(refreshToken);
//         }).catch((e) => {
//             reject(e);
//         });
//     })
// }

// let generateRefreshTokenExpiryTime = () => {
//     let daysUntilExpire = "10";
//     let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
//     return ((Date.now() / 1000) + secondsUntilExpire);
// }

const User = mongoose.model('User', userSchema);

module.exports = User;