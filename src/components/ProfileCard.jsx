/* eslint-disable react/prop-types */
import { IoMdSettings, IoIosPersonAdd, IoMdCheckmark } from "react-icons/io";
import { BsBriefcase, BsGithub, BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { updateProfile } from "../redux/userSlice";
import moment from "moment/moment";
import { motion } from "framer-motion";

export default function ProfileCard({ user }) {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: " 0px 70px 73px -33px rgba(0, 0, 0, 0.041)" }}
      className="w-full bg-primary  flex flex-col items-center rounded-xl px-6 py-4"
    >
      <div className="w-full flex items-center justify-between border-b border-[#66666645] pb-5 ">
        <Link to={`/profile/${user?._id}`}>
          <img
            src={user?.profileUrl ?? NoProfile}
            alt={user?.email}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>

        <div className="flex flex-col justify-center">
          <div className="flex lg:gap-16 md:gap-20 items-center">
            <Link to={`/profile/${user?._id}`}>
              <p className="text-md font-medium text-ascent-1 flex items-center gap-3">
                {user?.fullName}
                <span className="text-base text-blue">
                  {user?.verified ? (
                    <IoMdCheckmark
                      size={15}
                      className="bg-[#258dee] rounded-full p-0.5 text-white font-bold"
                    />
                  ) : (
                    ""
                  )}
                </span>
              </p>
              <span className="text-ascent-2">
                @{user?.username ?? "no username"}
              </span>
            </Link>

            <div>
              {user?._id === data?._id ? (
                <button onClick={() => dispatch(updateProfile(true))}>
                  <IoMdSettings size={20} color="#258dee" cursor="pointer" />
                </button>
              ) : (
                <button>
                  <IoIosPersonAdd size={20} color="#258dee" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
        <div className="flex items-center justify-between">
          <span className="text-ascent-2">Friends</span>
          <span className="text-ascent-1 text-lg">{user?.friends?.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ascent-2">Who viewed your profile</span>
          <span className="text-ascent-1 text-lg">{user?.views?.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ascent-2">Location</span>
          <span className="text-ascent-1">{user?.location ?? "Dessie"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ascent-2">Joined</span>
          <span className="text-ascent-1 text-base">
            {moment(user?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 py-4 pb-6">
        <p className="text-ascent-2 text-lg font-semibold">Social Profile</p>

        <div className="flex  items-center gap-6">
          <div className="flex gap-2 items-center text-ascent-2">
            <BsInstagram
              size={22}
              className="rounded-full bg-[#313131] p-1 text-white"
            />
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <BsTwitter
              size={22}
              className="rounded-full bg-[#258dee] p-1 text-white"
            />
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <BsGithub
              size={22}
              className="rounded-full bg-[#313131] p-1 text-white"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
