import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const tokenVerify = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
  
    if (!token)
      return res.json({ success: false, message: "user not authenticated" });
  
    const decodeToken = jwt.verify(token, process.env.JWT_KEY_FOR_ACCESS_TOKEN);
    console.log(decodeToken)
  
    const user = await User.findById(decodeToken?.id).select(
      "-password"
    );
    if (!user) {
      res.json({success: false, message: "invalid access token"})
    }
  
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"error and invalid access token"})
  }
};

export { tokenVerify };
