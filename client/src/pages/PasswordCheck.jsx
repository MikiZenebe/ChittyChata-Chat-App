import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { emailAPI, passwordAPI } from "../api/apiEndPoints";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";

export default function PasswordCheck() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    userId: "",
  });

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [location?.state?.name, navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await axios({
        method: "post",
        url: passwordAPI,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success("Logged in successfully 🚀");

      if (res.data.success) {
        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.res?.data?.message);
    }
  };

  return (
    <div className="bg h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="bg-white border shadow-black/5 shadow-lg w-full max-w-sm flex flex-col gap-6 rounded overflow-hidden p-6 mx-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar
            width={50}
            height={50}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-lg">{location?.state?.name}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={data.email}
            onChange={handleChange}
            required
          />{" "}
          <button
            type="submit"
            className="transition-all duration-[300ms] ease-out border-2 border-[#46a4ec] w-full h-[40px] rounded-lg bg-[#46a4ec] font-semibold hover:bg-[#46a4ec]/70 text-white disabled:cursor-not-allowed disabled:btn-disabled "
          >
            Login
          </button>
        </form>

        <p className="text-center">
          New User ?{" "}
          <Link to={"/register"} className="text-[#46a4ec] font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
