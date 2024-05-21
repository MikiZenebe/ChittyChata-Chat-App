import axios from "axios";
import { userDetailAPI } from "../api/apiEndPoints";
import { useEffect } from "react";

export default function Home() {
  const fetchUserDetails = async () => {
    try {
      const res = await axios({
        url: userDetailAPI,
        withCredentials: true,
      });

      console.log("user details", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return <div>Home</div>;
}
