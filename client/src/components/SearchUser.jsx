import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";

export default function SearchUser() {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            className="w-full outline-none py-1 h-full px-4"
            type="text"
            placeholder="Search user by username"
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/* Display Search user */}
        <div className="bg-white mt-2 w-full p-3 rounded">
          {searchUser.length === 0 && !loading && <p>no user found!</p>}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}
