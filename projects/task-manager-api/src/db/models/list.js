const mongoose = require('mongoose');
const Task = require('./task');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
})

listSchema.pre('remove', async function (next) {
    await Task.deleteMany({ listId: this._id })
    next()
})

const List = mongoose.model('List', listSchema);

module.exports = List;