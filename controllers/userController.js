const User = require('../models/User')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {
    registerUser: async (req, res) => {

        try {
            const { name, mail, password } = req.body
            const data = req.body

            if (!mail || !name || !password) {
                return res.status(400).json({message: "Anyone of the fields name, mail, password should not be empty"})
            }

            const userExists = await User.findOne({ mail })

            if (userExists) {
                return res.status(401).json({ message: "User Already Exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            data.password = hashedPassword

            const responseData = await User.create(data)

            return res.status(200).json({ message: "Registered Successfully" })

        }
        catch (err) {
            return res.status(500).json({ message: "Error Ocurred, Please try again", error: err.message })
        }
    },

    loginUser: async (req, res) => {

        try {

            const { mail, password } = req.body

            if (!mail || !password) {
                return res.status(400).json({message: "Anyone of the fields  mail, password should not be empty"})
            }

            const user = await User.findOne({ mail })

            if (!user) {
                return res.status(400).json({ message: "User not Found" })
            }

            const passMatch = await bcrypt.compare(password, user.password)

            if (!passMatch) {
                return res.status(400).json({ message: "Invalid Password" })
            }

            const userData = {
                id : user._id,
                mail : user.mail,
                name: user.name
            }
            jwt.sign(userData,process.env.SECRET_KEY, (err,data) => {

                if(err) {
                    return res.status(400).json(err)
                }

                return res.status(200).json({message: "Login Successfull", userInfo:{...userData, token:data}})
            })
        }

        catch (err) {
            return res.status(500).json({ message: "Error Ocurred", error: err.message })
        }

    }

}