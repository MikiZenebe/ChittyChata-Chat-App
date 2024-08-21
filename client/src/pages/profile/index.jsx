import { useAppStore } from "@/store";

export default function Profile() {
  const { userInfo } = useAppStore();
  console.log(userInfo);
  return <div>{userInfo.email}</div>;
}
