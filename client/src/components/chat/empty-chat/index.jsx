import { animationDefaultOption } from "@/lib/utils";
import Lottie from "react-lottie";

export default function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-white md:flex flex-col justify-center items-center hidden duration-1000 transition-all rounded-md my-2">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOption}
      />

      <div className="text-opacity-80 text-[#1b1c24] flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center font-semibold">
        <h3>
          Hi<span className="txt">!</span> Welcome to{" "}
          <span className="txt">ቡና ሰዓት</span> Chat App
        </h3>
      </div>
    </div>
  );
}
