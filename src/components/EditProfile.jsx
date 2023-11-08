import { useRef, useState } from "react";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/userSlice";
import { BiImages } from "react-icons/bi";

export default function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {};

  const handleClose = () => {
    dispatch(updateProfile(false));
  };
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <div
      className={`fixed inset-0  mx-auto  backdrop-blur-sm bg-[#2F2D30]/10  ${
        modalIsOpen ? "block" : "hidden"
      } overflow-y-auto mx-auto   flex justify-center items-center z-50`}
    >
      <div className="relative  w-[400px] sm:w-[500px] md:w-[600px] p-4  bg-primary rounded-lg">
        <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
          <div className="flex justify-between px- pt-5 pb-2">
            <label
              htmlFor="name"
              className="block font-medium text-xl text-ascent-1 text-left"
            >
              Edit Profile
            </label>

            <button className="text-ascent-1" onClick={handleClose}>
              <AiOutlineClose size={22} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-primary px-1 rounded-lg"
          >
            <div>
              <TextInput
                name="fullName"
                label="Full Name"
                placeholder="Full Name"
                type="text"
                styles="w-full rounded-lg p-2 bg-primary border"
                register={register("fullName", {
                  required: "Full Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label="Username"
                placeholder="User Name"
                type="text"
                styles="w-full rounded-lg p-2 bg-primary border"
                register={register("userName", {
                  required: "User Name do no match",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />

              <TextInput
                label="Location"
                placeholder="Location"
                type="text"
                styles="w-full rounded-lg p-2 bg-primary border"
                register={register("location", {
                  required: "Location do no match",
                })}
                error={errors.location ? errors.location?.message : ""}
              />

              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer mt-3"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  onChange={(e) => handleSelect(e)}
                  accept=".jpg, .png, .jpeg"
                />
                <BiImages color="#1077D3" />
                <span>Profile Image</span>
              </label>

              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="py-8 sm:flex sm:flex-row-reverse ">
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    containerStyle={`inline-flex justify-center rounded-md bg-[#1077D3] px-4 py-3 text-sm font-medium text-white outline-none`}
                    title="Update"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
