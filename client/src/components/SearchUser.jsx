/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Loading, UserSearchCard } from "./index";
import axios from "axios";
import { searchUserAPI } from "../api/apiEndPoints";
import toast from "react-hot-toast";

export default function SearchUser({ onClose }) {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.post(searchUserAPI, {
        search: search,
      });
      setLoading(false);

      setSearchUser(res.data.data);
    } catch (error) {
      toast.error(error?.res?.data?.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            className="w-full outline-none py-1 h-full px-4"
            type="text"
            placeholder="Search user by username"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center mx-2">
            <IoSearchOutline size={25} />
            <IoClose
              onClick={onClose}
              size={25}
              className="cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>

        {/* Display Search user */}
        <div className="bg-white mt-2 w-full p-3 rounded">
          {searchUser.length === 0 && !loading && (
            <p className="text-center">no user found 😌!</p>
          )}

          {loading && <Loading />}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
