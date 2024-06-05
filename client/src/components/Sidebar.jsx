import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Avatar, EditUser, SearchUser } from "../components/index";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((convUser, i) => {
          if (convUser.sender?._id === convUser.receiver?._id) {
            return { ...convUser, userDetails: convUser.sender };
          } else if (convUser.receiver._id !== user._id) {
            return { ...convUser, userDetails: convUser.receiver };
          } else {
            return { ...convUser, userDetails: convUser.sender };
          }
        });
        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user, allUser]);

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
              width={40}
              height={40}
              name={user.name}
              imageUrl={user?.profile_pic}
              userId={user._id}
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
          <h2 className="text-lg font-bold p-[18.5px]">
            Message
            <span className="text-sm font-normal text-blue-400 ml-1">
              48 <span className="text-xs">New</span>
            </span>
          </h2>
        </div>

        <div className="bg-slate-100 p-[0.5px]"></div>

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

          {allUser.map((conv, i) => {
            return (
              <div key={i} className="flex items-center gap-2 p-3">
                <div>
                  <Avatar
                    imageUrl={conv.userDetails.profile_pic}
                    name={conv?.userDetails.name}
                    width={40}
                    height={40}
                  />
                </div>

                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold">
                    {conv.userDetails?.name}
                  </h3>

                  <div className="text-slate-500 text-xs items-center gap-1">
                    <div className="flex items-center gap-2">
                      {conv?.lastMsg.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg.text && <span>Image</span>}
                        </div>
                      )}

                      {conv?.lastMsg.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-sm">{conv?.lastMsg.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
