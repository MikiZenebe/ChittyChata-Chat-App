/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";
import usePreviewImg from "../utils/usePreviewImg";
import { BsFillImageFill, BsPlus } from "react-icons/bs";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const imageRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        img: imgUrl,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same ⚠");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 chars ⚠");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 6 chars ⚠");
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

          <div className="flex gap-2 flex-col px-[3rem] ">
            <h1 className="font-bold text-md text-gray-500">
              Choose image as your profile picture
            </h1>
            <div className="mx-auto  flex items-center justify-center transition-all ease-in-out">
              <input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              {imgUrl ? (
                <div className="w-full mt-5 cursor-pointer relative">
                  <img
                    className="w-[70px] h-[70px] object-cover rounded-full "
                    src={imgUrl}
                    alt="Selected img"
                  />
                  <div
                    className=" absolute top-8 right-0 bottom-0 left-7 text-w"
                    onClick={() => {
                      setImgUrl("");
                    }}
                  />
                </div>
              ) : (
                <div className="rounded-full">
                  <BsFillImageFill
                    className=" cursor-pointer text-gray-700"
                    size={30}
                    onClick={() => imageRef.current.click()}
                  />
                </div>
              )}
            </div>
          </div>

          <input
            className="transition-all duration-[300ms] ease-out rounded-lg  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#0940b0] focus:border-transparent"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
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
          <input
            className="transition-all duration-[300ms] ease-out rounded-lg  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#0940b0] focus:border-transparent"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button
            className="mx-auto w-full transition-all duration-[300ms] ease-out text-white bg-[#0940b0]  h-[40px] rounded-lg hover:bg-[#4279e9] hover:text-white disabled:cursor-not-allowed disabled:btn-disabled  uppercase"
            type="submit"
          >
            Create User
          </button>
          <span className="uppercase">
            Already have an account?{" "}
            <Link className="text-[#0940b0] font-bold" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
