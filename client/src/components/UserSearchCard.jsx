/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function UserSearchCard({ user, onClose }) {
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="transition-all duration-[300ms] ease-out flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:bg-blue-400 hover:text-white rounded cursor-pointer"
    >
      <div>
        <Avatar
          width={40}
          height={40}
          name={user?.name}
          userId={user?._id}
          imageUrl={user?.profile_pic}
        />
      </div>

      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1 text-gray-500">
          @{user?.username}
        </p>
      </div>
    </Link>
  );
}
