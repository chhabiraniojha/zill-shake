const { Request, Response, NextFunction } = require('express')
const jwt = require('jsonwebtoken')

/**
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next
 */
const authMiddleware = async (req, res, next) => {
    try {

        const { token } = req.cookies

        if(!token) {
            return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized access"
            })
        }
        
        const decodedUser = await jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedUser) {
            return res
            .status(401)
            .json({
                success: false,
                message: "Token verfication failed"
            })
        }

        req['user'] = decodedUser
        next()

    } catch (error) {
        res
        .status(500)
        .json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = authMiddleware