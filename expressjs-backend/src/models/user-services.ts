import mongoose, { ConnectOptions, Schema } from "mongoose";
import userModel from "./user.js";

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .catch((error) => console.log(error));

async function getUsers(name: string, job: string) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  }
  return result;
}

async function findUserById(id: any) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user: any) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name: string) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job: string) {
  return await userModel.find({ job: job });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};
