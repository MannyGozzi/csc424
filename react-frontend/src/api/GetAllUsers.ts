import axios from "axios";

const getAllUsers = async (username: string) => {
  const response = await axios.get(
    `https://localhost:8000/api/account/get?username=${username}`,
  );
  return response.data.users;
};

export default getAllUsers;
