const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')


const protect = asyncHandler(async (req, res, next) => {
    let token
  
    if (
      req.headers.Authorization &&
      req.headers.Authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.Authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
  
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  })
  
  module.exports = { protect }