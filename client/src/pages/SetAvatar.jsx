/* eslint-disable react-hooks/exhaustive-deps */
import { avatar } from "../utils/multiAvatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setAvatarRoute } from "../utils/ApiRoutes";
import loader from "../assets/loader.gif";

export default function SetAvatar() {
  const api = avatar;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  useEffect(() => {
    const data = [];
    // for (let i = 0; i < 4; i++) {
    //   const image = axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
    //   const buffer = new Buffer(image.data);
    //   data.push(buffer.toString("base64"));
    // }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-[3rem] h-[100vh] w-[100vw]">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/png;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </div>
      )}
    </>
  );
}
