import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller function to register a new user
export const register = async (req, res) => {
  try {
    // Extract necessary fields from the request body
    const { fullname, email, phonenumber, password, role } = req.body;

    // Validate that all required fields are provided
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing", // Error message when any field is missing
        success: false,
      });
    }

    // Check if a user already exists with the provided email
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.", // Error message if email is already registered
        success: false,
      });
    }

    // Hash the user's password for security before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });

    // <-remove-optional-> Send success response (optional, consider adding this if missing)
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    // <-remove-optional-> Handle potential errors during the registration process
    return res.status(500).json({
      message: "Internal server error", // Error message for unexpected server issues
      success: false,
    });
  }
};

// Controller function to handle user login
export const login = async (req, res) => {
  // Destructure email, password, and role from the request body
  try {
    const { email, password, role } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing.", // Error message if any field is missing
        success: false,
      });
    }

    // Find the user by email in the database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.", // Error if the email doesn't match any user
        success: false,
      });
    }

    // Compare the entered password with the stored hashed password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect password.", // Error if the password doesn't match
        success: false,
      });
    }

    // Check if the provided role matches the user's role in the database
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.", // Error if the role doesn't match
        success: false,
      });
    }

    // Create a payload containing user information for the JWT token
    const tokenData = {
      userId: user._id, // Store user ID in the token payload
    };

    // Generate a signed JWT token using the secret key and token data
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Prepare the user object to be returned in the response (without the password)
    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    // Set the JWT token as an HTTP-only cookie for client-side security
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie valid for 1 day
        httpsOnly: true, // Prevents client-side scripts from accessing the cookie
        sameSite: "strict", // Mitigates CSRF attacks
      })
      .json({
        message: `Welcome back ${user.fullname}`, // Success message upon login
        user, // Return the user data in the response
        success: true,
      });
  } catch (error) {
    // Catch any server-side errors and send a 500 response
    return res.status(500).json({
      message: "Internal server error", // Error message for unexpected server issues
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully.",
      success: true,
    });
  } catch (error) {
    // Catch any server-side errors and send a 500 response
    return res.status(500).json({
      message: "Internal server error", // Error message for unexpected server issues
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    const file = req.file;

    //Cloudinary will come later

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Resume comes later here...

    await user.save();

    // Prepare the user object to be returned in the response (without the password)
    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    // Catch any server-side errors and send a 500 response
    return res.status(500).json({
      message: "Internal server error", // Error message for unexpected server issues
      success: false,
    });
  }
};
