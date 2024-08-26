import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import uploadFile from "@/lib/uploadFile";

export default function Profile() {
  const navigate = useNavigate();
  const [hoverd, setHoverd] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { userInfo, setUserInfo } = useAppStore();
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    profilePic: userInfo?.profilePic,
    color: selectedColor,
  });

  useEffect(() => {
    if (userInfo.profileSetup) {
      setData((preve) => {
        return {
          ...preve,
          ...userInfo,
        };
      });
    }

    console.log(userInfo);
  }, [userInfo]);

  const validateProfile = () => {
    if (!data.firstName) {
      toast.error("Firstname is required", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
      return false;
    }

    if (!data.lastName) {
      toast.error("Lastname is required", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
      return false;
    }

    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClient.post(UPDATE_PROFILE_ROUTE, {
          data: data,
          withCredentials: true,
        });

        if (res.status === 200 && res.data) {
          setUserInfo({ ...res.data });
          toast.success("Profile updated successfully 🚀🚀", {
            classNames: {
              toast:
                "group-[.toaster]:bg-green-500 group-[.toaster]:text-white",
              closeButton: "group-[.toaster]:bg-primary",
            },
          });
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNav = async () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImgChange = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: uploadPhoto?.url,
      };
    });
  };

  const handleDeleteImg = async () => {};

  return (
    <div className="h-[100vh] flex items-center justify-center flex-col">
      <div className="p-4 flex flex-col gap-10 w-[80vw] md:w-max  border-2 border-slate-200 rounded-3xl">
        <div className="flex items-center">
          <IoArrowBack
            onClick={handleNav}
            className="text-4xl text-slate-400 cursor-pointer "
          />
          <h3 className="text-center mx-auto text-2xl font-bold bg-gradient-to-r from-[#62E1FB] to-[#27BBF6] inline-block text-transparent bg-clip-text">
            Setup Profile
          </h3>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div
            className="h-36 w-36 sm:w-44 sm:h-44 md:w-56 md:h-56 relative flex items-center justify-center "
            onMouseEnter={() => setHoverd(true)}
            onMouseLeave={() => setHoverd(false)}
          >
            <Avatar className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full overflow-hidden transition-all duration-300 ease-out">
              {data.profilePic ? (
                <AvatarImage
                  src={data.profilePic}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-28 w-28 md:w-36 md:h-36 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {data.firstName
                    ? data.firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>

            {hoverd && (
              <div
                onClick={
                  data.profilePic ? handleDeleteImg : handleFileInputClick
                }
                className="absolute inset-4 sm:inset-8  md:inset-10 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full transition-all duration-300 ease-out"
              >
                {data.profilePic ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
          </div>
          <input
            type="file"
            name="profile-image"
            accept=".png, .jpg, .jpeg, .svg, .webp"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImgChange}
          />

          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 border-blue-200 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-[#4AD1F9] focus:border-transparent"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={handleOnChange}
                value={data.firstName}
                className="rounded-lg p-6 border-blue-200 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-[#4AD1F9] focus:border-transparent"
              />
            </div>{" "}
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={handleOnChange}
                value={data.lastName}
                className="rounded-lg p-6 border-blue-200 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-[#4AD1F9] focus:border-transparent"
              />
            </div>
            <div className="w-full flex items-center gap-5 justify-center">
              {colors.map((color, i) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === i
                      ? "outline outline-white/50 outline-1"
                      : ""
                  }`}
                  key={i}
                  onClick={() => setSelectedColor(i)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mx-auto pb-3 flex justify-center">
          <Button
            onClick={saveChanges}
            className="h-10 w-3/4  btn transition-all ease-out duration-300"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
