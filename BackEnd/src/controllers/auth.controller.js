import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ApiError(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ message: "Signup Successful!" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(new ApiError(400, "All fields are required!"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(new ApiError(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(new ApiError(400, "Invalid pasword!"));
    }


    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
      console.log('Login Successfull!');
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  console.log('Google auth route called with data:', req.body);
  const { name, email } = req.body;

  if (!name || !email) {
    console.error('Missing name or email in request');
    return next(new ApiError(400, "Name and email are required"));
  }

  try {
    const user = await User.findOne({ email });
    console.log('Existing user found:', user ? 'Yes' : 'No');

    let token, userData;

    if (user) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      userData = rest;
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
      });
      
      await newUser.save();
      console.log('New user created:', newUser.email);

      token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = newUser._doc;
      userData = rest;
    }

    // Set the cookie with SameSite and secure options
    res
      .status(200)
      .cookie("access_token", token, { 
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })
      .json(userData);
    
    console.log('Google authentication successful, token sent');
  } catch (error) {
    console.error('Error in Google auth:', error);
    next(error);
  }
};