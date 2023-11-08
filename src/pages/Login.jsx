import TextInput from "../components/TextInput";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.png";
import BgImg from "../assets/img.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Loading, CustomButton } from "../components/index";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-[black]/5 shadow-xl items-center justify-center">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6 justify-center">
            <div className="p-2 w-12 rounded text-white">
              <img src={Logo} alt="" />
            </div>
            <span className="text-2xl text-[#258dee] font-semibold">
              WeShare
            </span>
          </div>

          <p className="text-ascent-1 text-base font-semibold text-center">
            Log in to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2 text-center">
            Welcome back
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-8 flex flex-col gap-5"
          >
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address Required",
              })}
              styles="w-full  p-2 border"
              labelStyles="ml-2"
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              register={register("password", {
                required: "Password is Required!",
              })}
              styles="w-full p-2 border"
              labelStyles="ml-2"
              error={errors.password ? errors.password.message : ""}
            />

            <Link
              to="/reset-password"
              className="text-sm text-right text-[#258dee] font-semibold"
            >
              Forgot Password?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-lg ${
                  errMsg === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
                }`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyle={`inline-flex justify-center rounded-md bg-[#258dee] px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Login"
              />
            )}
          </form>

          <p className="text-ascent-2 text-sm text-center">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#258dee] font-semibold ml-2 cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* RIGHT */}
      </div>
    </div>
  );
}
