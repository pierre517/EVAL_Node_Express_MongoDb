import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
export default User;

// -----------------------------------------------//

export async function getAllUsers() {
  return await User.find();
}

// ---------------------------------------------//

export async function addUser(user) {
  try {
    await User.create(user);
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------------------------//

export async function deleteUser(user) {
  try {
    await User.deleteOne(user);
  } catch (error) {
    console.log(error);
  }
  return true;
}

// -----------------------------------------------//

export async function updateUser(userId, updatedUser) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
        },
      },
      { new: true }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

// -------------------------------------------------//

export async function getUser(user) {
  return await User.findById(user);
}
