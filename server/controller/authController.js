import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/userModel.js";
import { hassPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

// ---------------------- for user registration -------------------------------
export const register = async (req, res) => {
  try {
    // for admin authentication
    const { registerNo } = req.body;
    const isAdminAccount = registerNo == "012345678910";
    const isheadAccount = registerNo == "123123123123";

    req.body.role = isAdminAccount ? "admin" : isheadAccount ? "head" : "user";

    // for hassing the password
    const hashedPassword = await hassPassword(req.body.password);
    req.body.password = hashedPassword;

    // to save the register credentials to the database
    const user = await User.create(req.body);
    res.status(201).json({ msg: "user created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------- for user login ---------------------------------
export const login = async (req, res, next) => {
  try {
    // to get the user email from database
    const user = await User.findOne({ email: req.body.email });
    const password = req.body.password;

    // to check the user is available and compare the password hasing
    const isValidUser =
      user && (await comparePassword(password, user.password));
    if (!isValidUser) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    //   for jwt token generation
    const token = createJWT({ userId: user._id, role: user.role });
    const oneWeek = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneWeek),
      // secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ msg: "user is logged in", token });
  } catch (error) {
    next(error);
  }
};

// --------------------------- for admin login ---------------------------------
export const adminLogin = async (req, res, next) => {
  try {
    // Get the user email from the database
    const user = await User.findOne({ email: req.body.email });
    const { password, passkey } = req.body;

    // Check if the user exists and validate the password
    const isValidUser =
      user && (await comparePassword(password, user.password));
    if (!isValidUser) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // Check the passkey
    if (passkey !== process.env.PASS_KEY) {
      return res.status(400).json({ msg: "Passkey is incorrect" });
    }

    // Generate a JWT token
    const token = createJWT({ userId: user._id, role: user.role });
    const oneWeek = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneWeek),
    });

    // Respond with a success message
    res.status(200).json({ msg: "User is logged in", token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ---------------------- for staff registration -------------------------------
export const staffRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmailExist = await staffModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ msg: "Email already exist" });
    }
    // Hashing the password
    const hashedPassword = await hassPassword(req.body.password);
    req.body.password = hashedPassword;

    // Save the staff credentials to the database
    const staff = await staffModel.create(req.body);
    res.status(200).json({ msg: "Staff account created successfully", staff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --------------------------- for staff login ---------------------------------
export const staffLogin = async (req, res, next) => {
  try {
    const passKey = process.env.STAFF_PASS_KEY;
    const { passkey } = req.body;

    if (passkey !== passKey) {
      return res.status(400).json({ msg: "Invalid Passkey" });
    }

    const staff = await staffModel.findOne({ email: req.body.email });
    const password = req.body.password;

    const isValidUser =
      staff && (await comparePassword(password, staff.password));
    if (!isValidUser) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = createJWT({ userId: staff._id, role: staff.role });
    const oneWeek = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneWeek),
    });

    // Send token in response as well, allowing immediate access to it
    res.status(200).json({ msg: "User is logged in", token });
  } catch (error) {
    next(error);
  }
};

// -------------------------- for user logout ---------------------------------
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out!" });
};
