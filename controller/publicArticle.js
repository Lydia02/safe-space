const jwt = require("jsonwebtoken");
const passport = require("passport");
require('dotenv').config()
const Article = require('../models/blogModel')
//const { readingTime } = require('../utils/utils')

exports.getAllPublishedBlogs = async (req, res) => {
    try {
        let article = await Article.find()
        if(article === "published")
        return res.status(200).json({
            success:true,
            message: 'Published Articles found!',
            article
        })
        res.status(404).json({
            success:false,
            message: 'Published Articles not found!',
            
      }) 
 } catch(error) {
    res.status(500).json({
        success:false,
        message: "Interal Server Error",
        error: error.message
    })
 }
}

