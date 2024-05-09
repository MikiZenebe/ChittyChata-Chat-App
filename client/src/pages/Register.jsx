import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form");
  };

  const handleChange = (e) => {};

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
