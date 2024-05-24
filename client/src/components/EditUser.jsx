/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import { userUpdateAPI } from "../api/apiEndPoints";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Divider from "./Divider";

export default function EditUser({ onClose, user }) {
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: user?.username,
    name: user?.name,
    profile_pic: user?.profile_pic,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, ...user }));
  }, [user]);

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();

    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await axios({
        method: "post",
        url: userUpdateAPI,
        data: data,
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Profile updated successfully 🚀");
        dispatch(setUser(res.data.data));
        onClose();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-700 bg-opacity-40 flex items-center justify-center z-10 transition-all duration-[300ms] ease-in-out">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold text-lg">Profile Details</h2>

        <form onSubmit={handleSubmit} className="grid gap-3 mt-3">
          <div className="flex flex-col">
            <label className="text-gray-400">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={data.username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-400">Name</label>
            <input
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={data.name}
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <Avatar
              width={40}
              height={40}
              imageUrl={data?.profile_pic}
              name={data?.name}
            />

            <label className="cursor-pointer" htmlFor="profile_pic">
              <button
                className="transition-all duration-[300ms] ease-out  text-[#46a4ec] h-[40px] rounded-lg  font-semibold"
                onClick={handleOpenUploadPhoto}
              >
                Change Photo
              </button>
              <input
                type="file"
                id="profile_pic"
                hidden
                onChange={handleUploadPhoto}
                ref={uploadPhotoRef}
              />
            </label>
          </div>

          <Divider />
          <div className="flex gap-2 w-fit ml-auto ">
            <button
              onClick={onClose}
              className="transition-all duration-[300ms] ease-out  border-red-400 border text-red-400 px-4 py-1 rounded hover:bg-red-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="transition-all duration-[300ms] ease-out bg-blue-400 hover:bg-blue-500 text-white font-semibold border px-4 py-1 rounded "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
