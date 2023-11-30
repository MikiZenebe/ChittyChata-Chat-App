/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { CustomButton, Loading, TextInput } from "../components";
import { BsFiletypeGif } from "react-icons/bs";
import { BiImages, BiSolidVideo, BiFile } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { card } from "../animations/index";
import { apiRequest, handleFileUpload } from "../utils";

export default function PostModal({ onClose, fetchPost }) {
  const { user, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [posting, setPosting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    // Add event listener to close modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");

    try {
      const uri = file && (await handleFileUpload(file));
      const newData = uri ? { ...data, image: uri } : data;

      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        reset({
          description: "",
        });
        setFile(null);
        setErrMsg("");
        await fetchPost();
      }
      setPosting(false);
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0  mx-auto  backdrop-blur-sm bg-[#2F2D30]/10  ${
        modalIsOpen ? "block" : "hidden"
      } overflow-y-auto mx-auto   flex justify-center items-center z-50`}
    >
      <motion.div
        layout
        variants={card}
        animate="show"
        initial="hidden"
        className="relative  w-[400px] sm:w-[500px] md:w-[600px] p-4  bg-primary rounded-lg"
      >
        <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="bg-primary px-1 rounded-lg"
          >
            <div className="w-full flex justify-between items-center gap-2 py-4">
              <div className="text-ascent-2 flex items-center gap-2">
                <img
                  src={user?.profileUrl}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <span>
                  <p className="text-ascent-1">{user.fullName}</p>
                  <p className="text">@{user.username ?? "No Profession"}</p>
                </span>
              </div>
              <span onClick={closeModal}>
                <AiOutlineClose
                  size={30}
                  className="text-ascent-2 hover:text-ascent-1 cursor-pointer"
                />
              </span>
            </div>

            <div>
              <TextInput
                styles="w-full rounded-lg py-4 md:h-[100px] bg-primary border"
                placeholder="What's on your mind...."
                name="description"
                register={register("description", {
                  required: "Write something about post",
                })}
                error={errors.description ? errors.description.message : ""}
              />
            </div>
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

            <div className="flex items-center justify-between py-4 font-semibold">
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  data-max-size="5120"
                  accept=".jpg, .png, .jpeg"
                />
                <BiImages color="#1077D3" />
                <span>Images</span>
              </label>

              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer font-semibold"
                htmlFor="videoUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="videoUpload"
                  accept=".mp4, .wav"
                  data-max-size="5120"
                />
                <BiSolidVideo color="#FEA777" />
                <span>Video</span>
              </label>

              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer font-semibold"
                htmlFor="attachUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="attachUpload"
                  accept=".pdf, .docx, .pptx"
                  data-max-size="5120"
                />
                <BiFile color="#CF3441" />
                <span>Attachment</span>
              </label>
              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer font-semibold"
                htmlFor="vgifUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="vgifUpload"
                  accept=".gif"
                  data-max-size="5120"
                />
                <BsFiletypeGif color="#71D2AF" />
                <span>Gif</span>
              </label>
            </div>

            <div className="flex items-center justify-center py-0">
              {posting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  title="Post"
                  containerStyle="text-[#258dee] bg-[#E5F1FF] items-center justify-center my-6 py-4 px-6 text-[20.5px] sm:text-[21px] rounded-md w-full font-semibold text-sm"
                />
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
