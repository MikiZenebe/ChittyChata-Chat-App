import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { emailAPI } from "../api/apiEndPoints";
import axios from "axios";
import toast from "react-hot-toast";

export default function EmailCheck() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await axios.post(emailAPI, data);
      console.log("response", res);

      toast.success("Email Verified 🚀");

      if (res.data.success) {
        setData("");
        navigate("/password", {
          state: res?.data?.data,
        });
      }
    } catch (error) {
      toast.error(error?.res?.data?.message);
    }
  };

  return (
    <div className="bg h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="bg-white border shadow-black/5 shadow-lg w-full max-w-sm flex flex-col gap-6 rounded overflow-hidden p-6 mx-auto">
        <div className="flex items-center justify-center">
          <img className="w-[40px]" src={Logo} alt="" />
          <h2 className="text-lg font-bold text-[#00ADB5]">Chitty Chata</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />{" "}
          <button
            type="submit"
            className="transition-all duration-[300ms] ease-out border-2 border-[#46a4ec] w-full h-[40px] rounded-lg bg-[#46a4ec] font-semibold hover:bg-[#46a4ec]/70 text-white disabled:cursor-not-allowed disabled:btn-disabled "
          >
            Let's Go
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
