
const express = require('express')
const Article = require('../models/blogModel')
const { readingTime } = require('../utils/utils')

const createArticle = async (req, res, next) => {
  try {
    // grab details from the request
    // console.log(req.user)
    // console.log(req.User)
    // res.end()
    const { title, description ,tags, body } = req.body
    // create blog object
    const newArticle =  new Article({
      title,
      description,
      tags,
      body,
      author: req.user._id,

      // state,
      // read_count,
      timestamp:Date.now()
      // reading_time: readingTime(body)
    })
    console.log(newArticle)
    // save to database
    const createdArticle = await newArticle.save()
    //return response
    return res.status(201).json({
      status: true,
      data: createdArticle,
    })

    // return res.status(201).json(createArticle)
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

const AllPublishedArticles = async (req, res, next) => {
  try {
    const articles = await Article
      .find({ state: 'published' })
      .select({ title: 1 })
      .populate('author', { firstname:1 })

    return res.json({
      status: true,
      data: blogs
    })
  } catch (err) {
    err.source = 'get published blogs controller'
    next(err)
  }
}

const PublishedArticle = async (req, res, next) => {
  try {
    const { id } = req.params
    const article = await Article.findById(id)
      .populate('author', { firstname: 1 })

    if (article.state !== 'published') {
      return res.status(403).json({
        status: false,
        error: 'Requested article is not published'
      })
    }

    // update blog read count
    article.read_count += 1
    await article.save()

    return res.json({
      status: true,
      data: article
    })
  } catch (err) {
    err.source = 'get published article controller'
    next(err)
  }
}

module.exports = {
  createArticle,
  AllPublishedArticles,
  PublishedArticle,
}