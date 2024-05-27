import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "../components/index";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa";

export default function Message() {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });
    }
  }, [params.userId, socketConnection, user]);

  return (
    <div>
      <header className="sticky top-0 h-[65px] bg-white p-3 border-b border-slate-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="lg:hidden ">
            <FaAngleLeft size={20} />
          </Link>
          <div className="mt-2">
            <Avatar
              width={40}
              height={40}
              imageUrl={dataUser.profile_pic}
              name={dataUser.name}
              userId={dataUser._id}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg my-0  text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fa1e2] to-[#108ca6]">
                  online
                </span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className="hover:text-[#3fa1e2]">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      {/* Show All Messages */}
      <section className="h-[calc(100vh-64px)] bgMessage">
        Show all messages
      </section>
    </div>
  );
}
