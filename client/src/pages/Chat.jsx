import { useEffect, useState } from "react";
import Contact from "../components/Contact";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../utils/ApiRoutes";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  //Check if the user is in localstorage
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.username) {
        const data = axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/register");
      }
    }
  }, [currentUser, navigate]);

  return (
    <div className="bg h-[100vh] w-[100vw] flex flex-col justify-center gap-[1rem] items-center">
      <div className="h-[85vh] w-[85vw] bg-white grid">
        <Contact contacts={contacts} currentUser={currentUser} />
      </div>
    </div>
  );
}
