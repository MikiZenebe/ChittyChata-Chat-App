import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTES } from "@/utils/constants";

export default function MessageContainer() {
  const scrollRef = useRef();
  const {
    setSelectedChatMessages,
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          GET_ALL_MESSAGES_ROUTES,
          {
            id: selectedChatData._id,
          },
          { withCredentials: true }
        );
        if (res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact");
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((msg, i) => {
      const messageDate = moment(msg.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={i}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(msg.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMsg(msg)}
        </div>
      );
    });
  };

  const renderDMMsg = (msg) => {
    return (
      <div
        className={`${
          msg.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {msg.messageType === "text" && (
          <div
            className={`${
              msg.sender !== selectedChatData._id
                ? "bg-[#8407ff]/5 text-[#8407ff] border-[#8407ff]/5"
                : "bg-[#2a2b33]/5 text-gray border-gray"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {msg.content}
          </div>
        )}

        <div className="text-xs text-gray-600">
          {moment(msg.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
}
