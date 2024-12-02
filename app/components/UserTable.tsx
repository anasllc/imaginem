type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};

interface UserTableProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onEdit, onDelete }) => {
  const users: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      role: "Writer",
      email: "johndoe@gmail.com",
    },
    {
      id: 2,
      firstName: "Muhammad",
      lastName: "Kareem",
      role: "SM Manager",
      email: "muhammadkareem@gmail.com",
    },
    {
      id: 3,
      firstName: "Ali",
      lastName: "Mateen",
      role: "Admin",
      email: "alimateen@gmail.com",
    },
  ];

  return (
    <table className="w-full mt-6 border border-[#12121233] table-auto">
      <thead className="bg-[#F3F3F3] text-left">
        <tr>
          <th className="px-4 py-2 border">First Name</th>
          <th className="px-4 py-2 border">Last Name</th>
          <th className="px-4 py-2 border">Role</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-4 py-2 border">{user.firstName}</td>
            <td className="px-4 py-2 border">{user.lastName}</td>
            <td className="px-4 py-2 border text-[.8rem]">
              <div
                className={`${
                  user.role === "Writer"
                    ? "bg-blue-100 w-fit px-3 py-1 rounded-xl"
                    : user.role === "SM Manager"
                    ? "bg-green-100 w-fit px-3 py-1 rounded-xl"
                    : user.role === "Admin"
                    ? "bg-red-100 w-fit px-3 py-1 rounded-xl"
                    : ""
                }`}
              >
                {user.role}
              </div>
            </td>
            <td className="px-4 py-2 border">{user.email}</td>
            <td className="px-4 py-2 border text-center">
              <button
                onClick={() => onEdit(user)}
                className="text-green-500 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
