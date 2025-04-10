import { fetchAllUsers } from "@/app/_lib/data";
import UserTable from "@/app/components/UserTable";
import UserModal from "@/app/components/UserModal";
import DeleteAlert from "@/app/components/DeleteAlert";

// Server-side UsersPage component
export default async function UsersPage() {
  const users = await fetchAllUsers(); // Fetch users server-side

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center">
        <UserTable users={users} />
      </div>
    </div>
  );
}
