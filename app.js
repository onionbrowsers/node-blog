const express = require('express')
// 路径操作模块
const path = require('path')
const app = express()
// 用来处理post请求
const bodyParser = require('body-parser')

const router = require('./router')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(router)

// 开放静态文件
app.use('/public', express.static(path.join(__dirname,'public')))
app.use('/node_modules', express.static(path.join(__dirname,'node_modules')))

app.engine('html', require('express-art-template'))
// 可以改render函数的默认路径，即render第一个参数
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(3000, function () {
    console.log('成功')
})