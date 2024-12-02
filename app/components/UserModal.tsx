import { useState } from "react";

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password?: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  const isEditing = !!user;

  const [formData, setFormData] = useState<User>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    role: user?.role || "Writer", // Default role
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEditing ? "Editing User:" : "Adding User:", formData); // Replace with API call
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isEditing ? "Edit User" : "Add New User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block text-black mb-4">Informations</p>
            <input
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Writer">Writer</option>
              <option value="SM Manager">SM Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Email Field - Editable if Adding New User, Read-Only if Editing */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly={isEditing} // Email is readonly when editing
            />
          </div>

          {/* Password Fields - Editable for both Add and Edit */}
          <div className="mt-8 mb-4">
            <p className="block text-black mb-4">
              {isEditing ? "Password" : "Set Passwords"}
            </p>
            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex justify-end mt-8 gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white uppercase flex justify-center gap-2 items-center rounded-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded hover:bg-[#F3F3F3] border border-[#12121233]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UserModal;
