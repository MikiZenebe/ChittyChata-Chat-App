import { useState, useRef } from "react";
import usePreviewImg from "../utils/usePreviewImg";
import loader from "../assets/loader.gif";
import { BsFillImageFill } from "react-icons/bs";

export default function SetAvatar() {
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();

  //backdrop-blur-md bg-white/70

  return (
    <div className="bg">
      {!isLoading ? (
        <div className="flex items-center justify-center flex-col gap-[3rem] h-[100vh] w-[100vw]">
          {" "}
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-[3rem] h-[100vh] w-[100vw] ">
          <form className="flex gap-2 flex-col bg-white rounded-lg py-[2rem] px-[3rem] ">
            <h1 className="font-bold text-2xl">
              Pick an Avatar as your profile picture
            </h1>
            <div className="mx-auto  flex items-center justify-center transition-all ease-in-out">
              <input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              {imgUrl ? (
                <div className="w-full mt-5 ">
                  <img
                    className="w-[100px] h-[100px] object-cover rounded-full"
                    src={imgUrl}
                    alt="Selected img"
                  />
                </div>
              ) : (
                <div className="rounded-full">
                  <BsFillImageFill
                    className="ml-[5px] cursor-pointer"
                    size={50}
                    onClick={() => imageRef.current.click()}
                  />
                </div>
              )}
            </div>
            <button
              className="mx-auto w-full transition-all duration-[300ms] ease-out text-white bg-[#0940b0]  h-[40px] rounded-lg hover:bg-[#4279e9] hover:text-white disabled:cursor-not-allowed disabled:btn-disabled  uppercase mt-3"
              type="submit"
            >
              Set as Profile Picture
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
