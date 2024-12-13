const express = require('express')
const { getList, addList, removeList } = require('../controllers/listController')
const verifyToken = require('../middlewares/userAuthentication')

const router = express.Router()

router
.get('/getLists',verifyToken,getList)
.post('/addList',verifyToken,addList)
.post('/removeList',verifyToken,removeList)



module.exports = router