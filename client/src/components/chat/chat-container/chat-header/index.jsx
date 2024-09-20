import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";

export default function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-slate-200 flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-10 h-10 relative ">
            <Avatar className="w-10 h-10  object-cover rounded-full overflow-hidden transition-all duration-300 ease-out">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                  <span></span>
                </div>
              )}
            </Avatar>
          </div>

          <div>
            {selectedChatType === "contact" && selectedChatData.firstName ? (
              `${selectedChatData.firstName} ${selectedChatData.lastName}`
            ) : (
              <>
                @<span>selectedChatData.username</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-400 focus:border-none focus:outline-none focus:text-[#1b1c24] duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
