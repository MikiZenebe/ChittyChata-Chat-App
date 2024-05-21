import axios from "axios";
import { userDetailAPI } from "../api/apiEndPoints";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logOut, setUser } from "../redux/userSlice";
import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("redux-user", user);

  const fetchUserDetails = async () => {
    try {
      const res = await axios({
        url: userDetailAPI,
        withCredentials: true,
      });

      dispatch(setUser(res.data.data));

      if (res.data.logout) {
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

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px, 1fr] h-screen max-h-screen">
      <section className={`bg-red-300 ${!basePath && "hidden"}`}>
        Sidebar
      </section>
      <section className={` ${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
}
