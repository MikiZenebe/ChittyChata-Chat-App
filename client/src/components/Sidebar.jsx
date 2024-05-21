import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full h-full">
      <div className="bg-white w-12 h-full border-r py-5 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-[#3fa1e2] transition-all ease-in-out ${
                isActive && "text-[#3fa1e2]"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div
            className="w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-[#3fa1e2] transition-all ease-in-out"
            title="user"
          >
            <FaUserCircle size={25} />
          </div>
        </div>

        <div
          className="flex flex-col gap-2 items-center justify-center"
          title="user"
        >
          <button>
            <Avatar width={35} height={35} name={user.name} />
          </button>
          <button
            title="logout"
            className="w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-[#3fa1e2] transition-all ease-in-out"
          >
            <BiLogOut size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
