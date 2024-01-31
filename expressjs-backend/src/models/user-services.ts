import mongoose, { ConnectOptions, Schema } from "mongoose";
import userModel from "./user";
import fakeAuth from "../utils/FakeAuth";
import authenticateToken from "../middleware/AuthenticateToken";
import generateJWT from "../utils/AccessToken";
import { configDotenv } from "dotenv";

configDotenv();
// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .catch((error) => console.log(error));

async function getUsers(name: string, job: string) {
  let result;
  if (!name && !job) {
    result = await userModel.find({}).limit(50);
  } else if (name && !job) {
    result = await findUserByName(name)
  } else if (job && !name) {
    result = await findUserByJob(job)
  }
  result = result?.map((user: any) => user.username)
  return result;
}

async function findUserById(id: any) {
  try {
    const res = await userModel.findById(id)
    return res
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function findUserByJwt(jwt: string) {
  try {
    const res = await userModel.findOne({ jwt: jwt })
    return res
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user: any) {
  try {
    user.jwt = generateJWT(user);
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(username: string) {
  return await userModel.find({ username: username });
}

async function findUserByUsernamePassword(username: string, password: string) {
  const user = await userModel.findOne({ username: username, password: password });
  return user 
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
  findUserByUsernamePassword,
  findUserByJwt
};
