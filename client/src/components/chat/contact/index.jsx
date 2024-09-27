/* eslint-disable react/prop-types */
import logo from "@/assets/chat.png";
import ProfileInfo from "./profile-info";
import NewDM from "./new-dm";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACT_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "./ContactList";

export default function ContactContainer() {
  const { setDirectMessageContacts, directMessageContacts } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const res = await apiClient.get(GET_DM_CONTACT_ROUTES, {
        withCredentials: true,
      });
      if (res.data.contacts) {
        setDirectMessageContacts(res.data.contacts);
      }
    };
    getContacts();
  }, [setDirectMessageContacts]);

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

        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessageContacts} />
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
    <h6 className="uppercase tracking-widest text-[#1b1c24] px-6 font-semibold text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
