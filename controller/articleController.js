const express = require('express')
const Blog = require('../models/blogModel')
const { readingTime } = require('../utils/utils')

const createBlog = async (req, res, next) => {
  try {
    // grab details from the request
    const { title, description, author, tags, body, state } = req.body
    // create blog object
    const newBlog = new Blog({
      title,
      description,
      tags,
      author: req.user._id,
      body,
      state,
      read_count,
      timestamp:Date.now(),
      reading_time: readingTime(body)
    })
    // save to database
    const createdBlog = await newBlog.save()
    // return response
    return res.status(201).json({
      status: true,
      data: createdBlog,
    })
  } catch (error) {
    next(error)
  }
}

const getListOfPublishedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog
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

const getPublishedBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id)
      .populate('author', { firstname: 1 })

    if (blog.state !== 'published') {
      return res.status(403).json({
        status: false,
        error: 'Requested article is not published'
      })
    }

    // update blog read count
    blog.read_count += 1
    await blog.save()

    return res.json({
      status: true,
      data: blog
    })
  } catch (err) {
    err.source = 'get published blog controller'
    next(err)
  }
}

module.exports = {
  createBlog,
  getListOfPublishedBlogs,
  getPublishedBlog,
}