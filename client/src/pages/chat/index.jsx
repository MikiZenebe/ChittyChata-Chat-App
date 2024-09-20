import ChatContainer from "@/components/chat/chat-container/index";
import ContactContainer from "@/components/chat/contact";
import EmptyChatContainer from "@/components/chat/empty-chat";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Chat() {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [navigate, userInfo.profileSetup]);
  return (
    <div className="flex h-[100vh] bg-slate-200 text-[#1b1c24] overflow-hidden gap-1.5">
      <ContactContainer />

      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
}
