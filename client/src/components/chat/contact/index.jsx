/* eslint-disable react/prop-types */
import logo from "@/assets/chat.png";
import ProfileInfo from "./profile-info";
import NewDM from "./new-dm";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACT_ROUTES } from "@/utils/constants";

export default function ContactContainer() {
  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get(GET_DM_CONTACT_ROUTES, {
        withCredentials: true,
      });
      if (res.data.contacts) {
        console.log(res.data.contacts);
      }
    };
    getContacts();
  }, []);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-white rounded-md rounded-br-none mt-2 ml-2 w-full">
      <div className="pt-3 px-5  flex items-center gap-3">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h3 className="font-bold txt mt-2 text-xl">ቡና ሰዓት</h3>
        <img src={logo} alt="logo" className="w-8 h-8" />
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Message" />
          <NewDM />
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
