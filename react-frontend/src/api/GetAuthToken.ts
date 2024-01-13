import axios from "axios";

const getToken = async () => {
  const response = await axios.get(
    `https://localhost:8000/api/account/token`,
    /* { withCredentials: true } */
  );
  return response.data.token;
};

export default getToken;
