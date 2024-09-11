import ChatHeader from "@/components/chat/chat-container/chat-header/index";
import MessageContainer from "@/components/chat/chat-container/message-container/index";
import MessageBar from "@/components/chat/chat-container/message-bar/index";

export default function ChatContainer() {
  return (
    <div className="bg-white rounded-md mt-2 mr-2 fixed top-0 h-[100vh] w-[100vw] flex flex-col md:static md:flex-1 text-[#1b1c24]">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
}
