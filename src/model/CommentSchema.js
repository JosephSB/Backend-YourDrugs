const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CommentSchema = new Schema({
    userId: String,
    product: String,
    userName: String,
    score: Number,
    hour: String,
    comment: String,
},{ collection: "comments" })

const connection = require('./CommentsConnection')

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel