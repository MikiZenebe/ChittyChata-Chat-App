/* eslint-disable react/prop-types */
import logo from "@/assets/coffee-chat.png";
import ProfileInfo from "./profile-info";

export default function ContactContainer() {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-white rounded-md rounded-br-none mt-2 ml-2 w-full">
      <div className="pt-3 px-5  flex items-center gap-3">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <h3 className="font-bold txt mt-2 text-xl">Coffee Time</h3>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Message" />
        </div>
      </div>

      <div className="my-3">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
}

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-[#1b1c24] pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
