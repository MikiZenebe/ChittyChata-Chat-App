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
import {
  ADD_PROFILE_IMG_ROUTE,
  HOST,
  REMOVE_PROFILE_IMG_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";

export default function Profile() {
  const navigate = useNavigate();
  const [hoverd, setHoverd] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }

    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }

    console.log(userInfo.image);
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("Firstname is required", {
        classNames: {
          toast: "group-[.toaster]:bg-red-500 group-[.toaster]:text-white",
          closeButton: "group-[.toaster]:bg-primary",
        },
      });
      return false;
    }

    if (!lastName) {
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

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          {
            withCredentials: true,
          }
        );

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

    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await apiClient.post(ADD_PROFILE_IMG_ROUTE, formData, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        toast.success("Image updated successfully 🚀🚀", {
          classNames: {
            toast: "group-[.toaster]:bg-green-500 group-[.toaster]:text-white",
            closeButton: "group-[.toaster]:bg-primary",
          },
        });
      }
      console.log(res);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImg = async () => {
    try {
      const res = await apiClient.delete(REMOVE_PROFILE_IMG_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed successfully 🚀🚀", {
          classNames: {
            toast: "group-[.toaster]:bg-green-500 group-[.toaster]:text-white",
            closeButton: "group-[.toaster]:bg-primary",
          },
        });
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center flex-col">
      <div className="p-4 flex flex-col gap-10 w-[80vw] md:w-max  border-2 border-slate-200 rounded-3xl">
        <div className="flex items-center">
          <IoArrowBack
            onClick={handleNav}
            className="text-4xl text-slate-400 cursor-pointer "
          />
          <h3 className="text-center mx-auto text-2xl font-bold txt">
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
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className={`uppercase h-28 w-28 md:w-36 md:h-36 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>

            {hoverd && (
              <div
                onClick={image ? handleDeleteImg : handleFileInputClick}
                className="absolute inset-4 sm:inset-8  md:inset-10 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full transition-all duration-300 ease-out"
              >
                {image ? (
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
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 border-blue-200 transition-all duration-300 ease-out outline-none focus:outline-none focus:ring-2 focus:ring-[#4AD1F9] focus:border-transparent"
              />
            </div>{" "}
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
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
