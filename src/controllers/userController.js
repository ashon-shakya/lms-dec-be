import { User } from "../models/userModel.js";
import { compareData, encryptData } from "../helpers/encryptHelpers.js";
import {
  signRefreshToken,
  signToken,
  verifyRefreshToken,
} from "../helpers/tokenHelpers.js";
import { generateOTP } from "../helpers/helpers.js";
import { sendVerificationEmail } from "../helpers/emailHelpers.js";

export const registerUser = async (req, res) => {
  try {
    let newUser = req.body;

    newUser.password = encryptData(newUser.password);
    newUser.verificationToken = generateOTP();

    // send email with the verification link
    sendVerificationEmail(
      newUser.email,
      newUser.firstName,
      newUser.verificationToken,
    );

    const data = await User.insertOne(newUser);
    return res.send({
      status: "success",
      message: "User registeration succesful",
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000")) {
      return res.send({
        status: "error",
        message: "Email Already used!",
      });
    }
    return res.send({
      status: "error",
      message: "Error creating User",
    });
  }
};

export const generateAccessToken = async (req, res) => {
  try {
    // verify refresh token
    const refreshToken = req.headers.authorization;

    // get user data from refresh payload
    const data = verifyRefreshToken(refreshToken);

    // data.email
    const user = await User.findOne({ email: data.email });
    if (user) {
      const payload = { email: user.email };
      const accessToken = signToken(payload);

      return res.send({
        status: "success",
        message: "Access Token generated",
        accessToken,
      });
    } else {
      return res.send({
        status: "error",
        message: "User not found",
      });
    }

    // generate accessToken
  } catch (error) {
    return res.send({
      status: "error",
      message: "Refresh Token verification failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    //get the email password from req.body
    const { email, password } = req.body;

    //2. get user with the email
    const user = await User.findOne({ email });
    //3. compare the pasword
    //. db password = user .passwrd
    if (user) {
      // check for verified user
      if (user.isVerified) {
        const isMatched = compareData(password, user.password);

        if (isMatched) {
          // 4. generate jwt token
          const payload = { email: user.email };
          const accessToken = signToken(payload);

          const refreshToken = signRefreshToken(payload);

          return res.send({
            status: "success",
            message: "User logged in",
            accessToken,
            refreshToken,
          });
        } else {
          return res.status(401).send({
            status: "error",
            message: "Invalid credentials",
          });
        }
      } else {
        return res.status(401).send({
          status: "error",
          message: "User not verified",
        });
      }
    } else {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error logging in",
    });
  }
};

export const verifyUser = async (req, res) => {
  let { email, token } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    console.log(user.verificationToken);
    if (user.verificationToken == token) {
      // change the isVerified to true
      user.isVerified = true;
      await user.save();

      return res.send({
        status: "success",
        message: "User verified",
      });
    } else {
      return res.send({
        status: "error",
        message: "Token verification failed",
      });
    }
  } else {
    return res.send({
      status: "error",
      message: "User not found",
    });
  }
};

export const getUserDetail = async (req, res) => {
  return res.send({
    status: "success",
    message: "User Detail Fetched",
    user: req.user,
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send({
      status: "success",
      message: "All user fetched",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error fetching users",
    });
  }
};
export const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    newUser.password = encryptData(newUser.password);
    const data = await User.insertOne(newUser);
    return res.send({
      status: "success",
      message: "User added successfully",
      user: data,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000")) {
      return res.send({
        status: "error",
        message: "Email Already used!",
      });
    }
    return res.send({
      status: "error",
      message: "Error adding user",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { _id, role } = req.body;
    if (!_id || !role) {
      return res.send({
        status: "error",
        message: "Missing _id or role",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { role },
      { new: true },
    );

    if (updatedUser) {
      return res.send({
        status: "success",
        message: "User role updated successfully",
        user: updatedUser,
      });
    } else {
      return res.send({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error updating user role",
    });
  }
};
