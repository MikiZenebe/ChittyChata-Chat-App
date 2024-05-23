import Logo from "../assets/logo.png";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className=" border animate-spin w-fit rounded-full border-[#00adb5]">
        <img src={Logo} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
}
