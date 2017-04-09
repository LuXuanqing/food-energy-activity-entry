`use strict`
const express = require('express')
const app = express()
// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 启动服务器
const port = 3000
const server = app.listen(port, () => {
  console.log(`food-energy is running at port ${port}`)
})

// mongoDB相关
const MongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017/food-energy'

// 静态资源
app.use(express.static('public'))
// app.use(express.static('public/pages'))

// 路由
// food-energy首页
app.get('/food-energy', (req, res) => {
  res.sendFile('/food-energy/index.html')
})
// 处理提交的申请
app.post('/food-energy/submit', (req, res) => {
  let entry = req.body.entry
  // 提交的时间
  entry.date = new Date()
  // 连接数据库
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('connected successfully')
    let col = db.collection('test')
    // 增加数据
    col.insert(entry, (err, result) => {
      if (err) {
        console.log(err)
        res.send('垃圾服务器又出错了，麻烦你再重试一次')
      } else {
        console.log(result)
        res.json(result)
      }
      db.close()
    })
  })
})
// 查询
app.get('/food-energy/query', (req, res) => {
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('成功连接数据库')
    let col = db.collection('test')
    col.find().toArray((err, docs) => {
      if (err) {
        console.log(err)
        return
      } else {
        console.log(docs)
        res.json(docs)
      }
      db.close()
    })
  })
})
