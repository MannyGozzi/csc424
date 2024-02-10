import axios from "axios";
import { HOST_URL } from "../../config";

const getAllUsers = async (username: string) => {
  const response = await axios.get(
    `${HOST_URL}/api/account/get?username=${username}`,
  );
  return response.data.users;
};

export default getAllUsers;
