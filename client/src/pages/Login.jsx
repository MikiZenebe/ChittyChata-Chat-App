/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email and Password is required. ⚠");
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required. ⚠");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center gap-[1rem] items-center bg">
        <form
          className="flex flex-col gap-5 bg-white rounded-lg py-[2rem] px-[3rem]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-2 justify-center">
            <img className="h-[3rem]" src={Logo} alt="" />
            <h1 className=" text-lg font-semibold">EnnyMini</h1>
          </div>

          <input
            className="transition-all duration-[300ms] ease-out rounded-lg  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#0940b0] focus:border-transparent"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="transition-all duration-[300ms] ease-out rounded-lg  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#0940b0] focus:border-transparent"
            type="password"
            placeholder="Passowrd"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button
            className="mx-auto w-full transition-all duration-[300ms] ease-out text-white bg-[#0940b0]  h-[40px] rounded-lg hover:bg-[#4279e9] hover:text-white disabled:cursor-not-allowed disabled:btn-disabled  uppercase"
            type="submit"
          >
            Log In
          </button>
          <span className="uppercase">
            Don't have an account ? {""}
            <Link className="text-[#0940b0] font-bold" to="/register">
              Create One.
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
