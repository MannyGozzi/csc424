import axios from "axios";
import { HOST_URL } from "../../config";

const getToken = async () => {
  const response = await axios.get(
    `${HOST_URL}/api/account/token`,
    /* { withCredentials: true } */
  );
  return response.data.token;
};

export default getToken;
