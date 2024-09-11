import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";

export default function ProfileInfo() {
  const { userInfo } = useAppStore();

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-slate-50">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-10 h-10 relative ">
          <Avatar className="w-10 h-10  object-cover rounded-full overflow-hidden transition-all duration-300 ease-out">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>

        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>

      <div className="flex gap-5"></div>
    </div>
  );
}
