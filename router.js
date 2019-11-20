const express = require('express')
const router = express.Router()

// md5加密
const utility = require("utility")

const User = require('./modules/user')

router.get('/', function(req, res) {
    res.render('index.html')
})

router.get('/login', function(req, res) {
    res.render('login.html')
})

// router.post('/', function(req, res) {
//     res.render('index.html')
// })

router.get('/register', function(req, res) {
    res.render('register.html')
})

router.post('/register', function(req, res) {
    let body = req.body
    // 判断邮箱是否存在
    User.findOne({
        $or: [
            {email: body.email},
            {nickname: body.nickname}
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).send({
                err_code: 500,
                success: false,
                message: 'Server Error'
            })
        }
        if (data) {
            return res.status(200).send({
                err_code: 1,
                result: '此用户已存在',
                success: true
            })
        }
        // 给用户密码加密
        body.password = utility.md5(body.password)
        new User(body).save(function (err) {
            if (err) {
                // err_code用来判断结果
                return res.status(500).send({
                    err_code: 500,
                    success: false,
                    message: 'Server Error'
                })
            }
            res.status(200).send({
                err_code: 0,
                result: 'OK',
                success: true
            })
        })
    })
})

module.exports = router