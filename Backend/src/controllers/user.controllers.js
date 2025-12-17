import {User} from "../models/user.models.js";
import { apiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  const { username, email, fullName, password } = req.body;

if ([username, email, fullName, password].some(field => field?.trim() === "")) {
  throw new apiError(400, "All Fields Are Required!!");
}
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "user already exist");
  }

  // check for images : for avtar and coverimage
  const avatarLocalPath = req.files?.avatar?.[0].path ;
  const coverImageLocalPath = req.files?.coverImage?.[0].path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar image needed");
  }

  // upload them on cloudinary, avtar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar?.url) {
    throw new apiError(400, "Failed to upload avatar to cloudinary");
  }

  // create user object - create entry in db
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.secure_url || "",
    email,
    password,
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation : return response
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while creating the user");
  }
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User Registered Successfully"));
});


export {registerUser};