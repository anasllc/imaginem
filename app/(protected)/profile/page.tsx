import ProfileDetails from "@/app/components/ProfileDetails";
import { activeUser } from "@/app/_lib/data";

export default async function ProfilePage() {
  const user = await activeUser();

  const profileData = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    imagesLeft: user.imagesLeft ?? 0,
    totalImagesGenerated: user.totalImagesGenerated ?? 0,
  };

  return (
    <div className="max-w-[600px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <ProfileDetails activeUser={profileData} />
    </div>
  );
}
