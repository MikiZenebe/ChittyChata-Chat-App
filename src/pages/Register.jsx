import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Loading, CustomButton } from "../components/index";
import { apiRequest } from "../utils";

export default function Register() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-[black]/5 shadow-xl items-center justify-center">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col items-center justify-center">
          <div className="w-full flex gap-2 items-center mb-6 justify-center">
            <div className="p-2 w-12 rounded text-white">
              <img src={Logo} alt="" />
            </div>
            <span className="text-2xl text-[#258dee] font-semibold">
              WeShare
            </span>
          </div>

          <p className="text-ascent-1 text-base font-semibold text-center">
            Create your account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-8 flex flex-col gap-5"
          >
            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="fullName"
                placeholder="Full Name"
                label="Full Name"
                type="text"
                register={register("fullName", {
                  required: "Full Name is Required",
                })}
                styles="w-full  p-2 border"
                error={errors.fullName ? errors.fullName.message : ""}
              />

              <TextInput
                name="username"
                placeholder="User Name"
                label="User Name"
                type="text"
                register={register("username", {
                  required: "User Name do not match",
                })}
                styles="w-full  p-2 border"
                error={errors.username ? errors.username.message : ""}
              />
            </div>
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address Required",
              })}
              styles="w-full  p-2 border"
              error={errors.email ? errors.email.message : ""}
            />

            <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                register={register("password", {
                  required: "Password is Required!",
                })}
                styles="w-full  p-2 border"
                error={errors.password ? errors.password.message : ""}
              />

              <TextInput
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                      return "Password do no match";
                    }
                  },
                })}
                styles="w-full  p-2 border"
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

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
                title="Create Account"
              />
            )}
          </form>

          <p className="text-ascent-2 text-sm text-center">
            Have an account?
            <Link
              to="/login"
              className="text-[#258dee] font-semibold ml-2 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT */}
      </div>
    </div>
  );
}
