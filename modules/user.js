const mongoose  = require('mongoose')

mongoose.connect('mongodb://localhost: 27017/test', {useNewUrlParser: true, useUnifiedTopology: true})

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 不能写括号，会直接执行，相当于写死
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date,
        default: null
    },
    status: {
        type: Number,
        // 0 均可
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        dafault: 0
    }
})

module.exports = mongoose.model('User', userSchema)