import axios from "axios";
import io from "socket.io-client";
import { userDetailAPI } from "../api/apiEndPoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logOut, setUser, setOnlineUser } from "../redux/userSlice";
import logo from "../assets/logo.png";
import { Sidebar } from "../components/index";
import { backEndUrl } from "../api/apiEndPoints";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const res = await axios({
        url: userDetailAPI,
        withCredentials: true,
      });

      dispatch(setUser(res.data.data));

      if (res.data.data.logout) {
        dispatch(logOut());
        navigate("/email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  /* Socket Connection */
  useEffect(() => {
    const socketConnection = io(backEndUrl, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data));
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-[#fafafa] ${!basePath && "hidden"} lg:block `}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div className="flex items-center">
          <img className="w-[60px] h-[60px]" src={logo} alt="" />
          <h2 className="text-xl font-bold text-[#46a4ec]">Chitty Chata</h2>
        </div>
        <p className="text-lg mt-2 text-gray-400 font-semibold">
          Select user to send message
        </p>
      </div>
    </div>
  );
}
