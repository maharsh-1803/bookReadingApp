const express = require('express')
const {addCategory, deleteCategory, updateCategory, readAllCategory} = require('../controller/category.controller.js')

const router = express.Router();

router.post('/addCategory',addCategory)
router.delete('/deleteCategory/:id',deleteCategory)
router.patch('/updateCategory/:id',updateCategory)
router.get('/getAllCategory',readAllCategory)


module.exports = router;