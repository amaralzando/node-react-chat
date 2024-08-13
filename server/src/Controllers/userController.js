import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../Models/userModel.js";

const createToken = (user_Id) => {
  const jwtkey = process.env.JWT_KEY;

  return jwt.sign({ user_Id }, jwtkey, { expiresIn: "3d" })
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {

    let user = await userModel.findOne({ email })

    if (user) return res.status(400).json("User with the given email already exist...")

    if (!name || !email || !password) return res.status(400).json("All fiels are required...")

    if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email...")

    user = new userModel({ name, email, password })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()
    const token = createToken(user._id)

    res.status(200).json({ user_Id: user._id, name, email, token })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const LoginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) return res.status(400).json("All fiels are required...")

    let user = await userModel.findOne({ email })

    if (!user) return res.status(400).json("Invalid email or password...")

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) return res.status(400).json("Invalid email or password...")

    const token = createToken(user._id)

    res.status(200).json({ user_Id: user._id, name: user.name, email, token })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const FindUser = async (req, res) => {
  const { user_Id } = req.body

  try {
    let user = await userModel.findById(user_Id)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
} 