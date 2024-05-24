import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Avatar, EditUser, SearchUser } from "../components/index";
import { useSelector } from "react-redux";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchUser, setSearchUser] = useState(true);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr]">
      <div className="bg-white w-12 h-full border-r py-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center pb-6">
            <img width={23} height={23} src={logo} alt="" />
          </div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12  text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-blue-400 transition-all ease-in-out ${
                isActive && "text-blue-400 "
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div
            onClick={() => setSearchUser(true)}
            className="w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-blue-400 transition-all ease-in-out"
            title="user"
          >
            <FaUserPlus size={25} />
          </div>
        </div>

        <div
          className="flex flex-col gap-2 items-center justify-center"
          title={user.name}
        >
          <button onClick={() => setEditUserOpen(true)}>
            <Avatar
              width={45}
              height={45}
              name={user.name}
              imageUrl={user?.profile_pic}
            />
          </button>
          <button
            title="logout"
            className="w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-blue-400 transition-all ease-in-out"
          >
            <BiLogOut size={25} />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div>
          <h2 className="text-lg font-bold p-5">
            Message
            <span className="text-sm font-normal text-blue-400 ml-1">
              48 <span className="text-xs">New</span>
            </span>
          </h2>
        </div>

        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-400">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-500">
                Explore users to start a conversation
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Moada */}
      {editUserOpen && (
        <EditUser onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/* Search User */}
      {searchUser && (
        <SearchUser onClose={() => setSearchUser(false)} user={user} />
      )}
    </div>
  );
}
