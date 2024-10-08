import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

export default function MessageBar() {
  const emojiRef = useRef();
  const fileRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const socket = useSocket();

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        content: message,
        receiver: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }

    setMessage("");
  };

  const handleAttachClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleAttachChange = async (e) => {
    try {
      const file = e.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data) {
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo._id,
              content: undefined,
              receiver: selectedChatData._id,
              messageType: "file",
              fileUrl: res.data.filePath,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[10vh]  flex justify-center items-center px-8 mb-6 gap-1">
      <div className="flex-1 flex bg-slate-50 rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 py-3 px-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-[#1b1c24] duration-300 transition-all"
          onClick={handleAttachClick}
        >
          <GrAttachment className="text-xl" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={handleAttachChange}
        />

        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-[#1b1c24] duration-300 transition-all"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-xl" />
          </button>
          <div className="absolute bottom-16 right-8" ref={emojiRef}>
            <EmojiPicker
              theme="light"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className="btn rounded-md flex items-center justify-center py-3 px-3 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-xl" />
      </button>
    </div>
  );
}
