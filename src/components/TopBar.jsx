import { Logo } from "../assets";
import { Link } from "react-router-dom";
import { TextInput, CustomButton } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SetTheme } from "../redux/theme";
import { Logout, updateProfile } from "../redux/userSlice";
import { BsCardChecklist, BsSunFill } from "react-icons/bs";
import {
  IoMdNotificationsOutline,
  IoIosSettings,
  IoMdHelp,
} from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TopBar() {
  const modalRef = useRef();

  useEffect(() => {
    // Add event listener to close modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [toggle, setToggle] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (data) => {};

  const scaleVariants = {
    whileInView: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="topbar w-full flex items-center justify-between py-5 lg:px-10 md:py-4 px-4 bg-primary shadow-sm backdrop-blur-md ">
      <Link to="/" className="flex gap-2 items-center">
        <div className="w-6 rounded">
          <img src={Logo} alt="" />
        </div>
        <span className="text-xl md:text-2xl text-[#258dee] font-semibold">
          WeShare
        </span>
      </Link>

      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[20rem] rounded-l-full py-3 border border-gray-300"
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyle="bg-[#258dee] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* Dark an Light */}

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex p-[4px] rounded-md gap-4">
          <IoMdNotificationsOutline size={22} color="#258dee" />
          <button onClick={() => handleTheme()}>
            {theme ? (
              <p className="flex items-center gap-2">
                <BsSunFill size={20} color="#258dee" />
              </p>
            ) : (
              <BsSunFill />
            )}
          </button>
        </div>
        <h1 className="text-ascent-2 font-medium">{user.fullName}</h1>
        <div ref={modalRef} className="cursor-pointer">
          <img
            src={Logo}
            alt="user"
            className="w-[40px] h-[40px] rounded-full object-cover"
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        ref={modalRef}
        className={`bg-primary flex flex-col gap-2 shadow-[black]/5 shadow-xl ${
          !toggle ? "hidden" : "flex"
        } p-6 bg-gray-500  absolute top-20 right-0 mx-4 my-2 min-w-[250px] rounded-xl dropDown`}
      >
        <div className="flex flex-col gap-6  text-ascent-1 text-md md:text-xl">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[20px] mb-3">Profile</p>

            <button className="mb-2 lg:hidden" onClick={() => handleTheme()}>
              {theme ? (
                <p className="flex items-center gap-2">
                  <BsSunFill size={20} color="#258dee" />
                </p>
              ) : (
                <BsSunFill />
              )}
            </button>
          </div>
          <hr className="border-ascent-2" />
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center gap-2"
          >
            <BsCardChecklist color="#258dee" />
            <span className="">My Profile</span>
          </Link>

          <button
            onClick={() => dispatch(updateProfile(true))}
            className="flex items-center gap-2"
          >
            <IoIosSettings color="#258dee" />
            <span className="">Settings</span>
          </button>

          <p className="flex items-center gap-2">
            <IoMdHelp color="#258dee" />
            <span className="">Help</span>
          </p>
          <hr className="mt-2 border-ascent-2" />

          <div>
            <CustomButton
              onClick={() => dispatch(Logout())}
              title="Logout"
              type="submit"
              containerStyle="bg-[#258dee] text-white px-4 md:px-6 py-1 md:py-2 rounded-md"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
