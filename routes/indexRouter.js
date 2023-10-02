const express = require("express")
const { hompage } = require("../controllers/indexControllers")
const router = express.Router()


router.get("/",hompage)




module.exports=router
