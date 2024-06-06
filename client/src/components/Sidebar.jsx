import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, EditUser, SearchUser } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { logOut } from "../redux/userSlice";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((convUser) => {
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
  }, [socketConnection, user]);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/email");
    localStorage.clear();
  };

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr]">
      <div className="bg-white w-12 h-full border-r py-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center pb-6">
            <img width={23} height={23} src={logo} alt="" />
          </div>
          <NavLink
            className={({ isActive }) =>
              `w-10 h-10 mx-auto  text-slate-400 flex justify-center items-center cursor-pointer rounded  transition-all ease-in-out ${
                isActive && "bg text-white"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={22} />
          </NavLink>

          <div
            onClick={() => setSearchUser(true)}
            className="w-12 h-12 text-slate-400 flex justify-center items-center cursor-pointer rounded hover:text-blue-400 transition-all ease-in-out"
            title="user"
          >
            <FaUserPlus size={22} />
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
            onClick={handleLogOut}
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
            {/* <span className="text-sm font-semibold text-blue-400 ml-1">
              {allUser.length} <span className="text-xs">New</span>
            </span> */}
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
              <NavLink
                to={`/${conv?.userDetails?._id}`}
                key={i}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 cursor-pointer rounded  transition-all ease-in-out ${
                    isActive && "bgActive my-2 mx-2 text-white"
                  }`
                }
              >
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
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}

                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-sm">{conv?.lastMsg?.text}</p>
                  </div>
                </div>

                {conv?.unseenMsg ? (
                  <p className="text-xs font-semibold ml-auto p-1 bg-cyan-600 text-white rounded-full h-6 w-6 flex  justify-center text-center items-center">
                    {conv?.unseenMsg}
                  </p>
                ) : null}
              </NavLink>
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
