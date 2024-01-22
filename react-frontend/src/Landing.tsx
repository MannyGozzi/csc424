
import getAllUsers from "./api/GetAllUsers";
import getToken from "./api/GetAuthToken";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getContactsAPI, setContactsAPI } from "./api/Contacts";

const Landing = () => {  
    const [token, setToken] = useState<string>("...")
    const [users, setUsers] = useState<string[]>([])
    const [contacts, setContacts] = useState<string[]>([])

    useEffect(() => {
      getToken().then((token: string) => {
          setToken(token)
      })

      getAllUsers("").then((users: string[]) => {
          setUsers(users)
      })

      getContactsAPI().then((contacts: string[]) => {
        setContacts(contacts)
      })
    }, [])
    
    const onAddContact = (contact: string) => {
      setContactsAPI([...contacts, contact])
      setContacts([...contacts, contact])
    }    
    return (
      <div>
        <h2>Landing (Protected)</h2>
        <div> 
          <div>Authenticated as</div> 
          <strong>{token.substring(0, 30) + "..."}</strong>
          <br/>
          <strong>Note this is a jwt cookie, don't share</strong>
          </div>
        <div className="contacts-add-header">
          <h3>Contacts</h3>
          <h3>Add Contacts</h3>
        </div>
        <div className="contacts-grid">
          <div>
            {contacts.map((contact: string, index: number) => (
              <p style={{ textAlign: "left" }} key={index}>{contact}</p>
            ))}
          </div>
          <div>
            {users.filter(x => !contacts.includes(x)).map((contact: string, index: number) => (
              <div key={index} className="contact-item">
                <p>{contact}</p>
                <button onClick={() => onAddContact(contact)}><FontAwesomeIcon icon={faXmark}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default Landing;