import axios from "axios";

const getContactsAPI = async () => {
  const response = await axios.get(
    'https://localhost:8000/api/data/contacts',
  );
  return response.data.contacts;
};

const setContactsAPI = async (contacts: string[]) => {
    const response = await axios.post(
        'https://localhost:8000/api/data/contacts',
        { contacts },
    );
    return response.data.contacts;
}

export { getContactsAPI, setContactsAPI};
