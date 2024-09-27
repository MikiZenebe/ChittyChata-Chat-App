/* eslint-disable react/prop-types */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";

export default function ContactList({ contacts, isChannel = false }) {
  const {
    selectedChatData,
    setSelectedChatType,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`px-2 py-2 mx-6 transition-all duration-300 delay-200 cursor-pointer rounded-lg ${
            selectedChatData && selectedChatData._id === contact._id
              ? "btn hover:btn transition-all duration-300 delay-200"
              : " hover:btn"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-3.5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="w-10 h-10 object-cover rounded-full overflow-hidden transition-all duration-300 ease-out">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className={`${
                      selectedChatData && selectedChatData._id === contact._id
                        ? "bg-red-500"
                        : getColor(contact.color)
                    } uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                    <span></span>
                  </div>
                )}
              </Avatar>
            )}

            {isChannel && (
              <div className="bg-red-500 h-10 w-10 flex items-center justify-center rounded-full"></div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span className="text-[#1b1c24] text-md">{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
