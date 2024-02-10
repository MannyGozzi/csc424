import axios from "axios";
import { HOST_URL } from "../../config";

const getContactsAPI = async () => {
  const response = await axios.get(
    `${HOST_URL}/api/data/contacts`,
  );
  return response.data.contacts;
};

const setContactsAPI = async (contacts: string[]) => {
    const response = await axios.post(
        `${HOST_URL}/api/data/contacts`,
        { contacts },
    );
    return response.data.contacts;
}

export { getContactsAPI, setContactsAPI};
