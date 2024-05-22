import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Avatar, EditUser } from "../components/index";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="bg-white w-12 h-full border-r py-5 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-blue-400 transition-all ease-in-out ${
                isActive && "text-blue-400 "
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div
            className="w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-blue-400 transition-all ease-in-out"
            title="user"
          >
            <FaUserCircle size={25} />
          </div>
        </div>

        <div
          className="flex flex-col gap-2 items-center justify-center"
          title={user.name}
          onClick={() => setEditUserOpen(true)}
        >
          <button>
            <Avatar
              width={35}
              height={35}
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

      {/* Edit User Moada */}
      {editUserOpen && (
        <EditUser onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
}
