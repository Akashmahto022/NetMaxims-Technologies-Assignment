import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarLocalPath = await req.file.filename;
    console.log(avatarLocalPath);

    const newUser = await User({
      name: name.toLowerCase(),
      email: email,
      password: hashPassword,
      avatar: avatarLocalPath || "localpath",
    });

    await newUser.save();
    res.json({ success: true, message: "user register successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in register user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        success: false,
        message: "user does not exists with this email",
      });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return res.json({
        success: false,
        message: "Wrong Password please enter valid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY_FOR_ACCESS_TOKEN
    );

    const userData = await User.findById(user._id).select("-password");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(userData);
  } catch (error) {
    res.json({ success: false, message: "Error in login" });
  }
};

const getCurrentUser = async (req, res) => {
  return res
    .status(200)
    .json({user: req.user});
};


const updateAccountDetails = async (req, res) => {
    const { name, email } = req.body;

  if (!name || !email) {
    throw new apiError(400, "All fields required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        name:name,
        email:email,
      },
    },
    { new: true }
  ).select("-password");
  console.log(user)

  res.status(200).json({data:user, message: "User update successfully"})

};
const updateUserAvatar = async (req, res) => {
    const avatarLocalPath = await req.file.filename;
    if (!avatarLocalPath) {
        res.status(400).json({success: false, message: "upload your profile image"})
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            avatar: avatarLocalPath,
          },
        },
        { new: true }
      ).select("-password");

      res.status(200).json({data:user, message: "User profile update successfully"})
};

export {
  register,
  login,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
};
