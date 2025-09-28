import { User } from "@clerk/nextjs/server";
import Avatar from "./Avatar";
import { useUser } from "@clerk/nextjs";

type OnlineUserProps = {
  profile: User | null;
};

function OnlineUser({ profile }: OnlineUserProps) {
  const { user } = useUser();

  if(profile?.id === user?.id) return null
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer">
      <Avatar src={profile?.imageUrl} />
      <div className="text-sm">{profile?.fullName?.split(" ")[0]}</div>
    </div>
  );
}

export default OnlineUser;
