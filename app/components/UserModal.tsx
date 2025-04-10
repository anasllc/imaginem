"use client";

import { useState } from "react";
import {
  inviteUser,
  updateUserRole,
  initiatePasswordReset,
} from "../(protected)/manage/users/actions";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSuccess: () => void; // Callback for clearing the form and closing the modal
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSuccess,
}) => {
  const isEditing = !!user; // Determine if we're editing an existing user
  const [formData, setFormData] = useState<User>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    role: user?.role || "writer",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange =
    (key: keyof User) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    };

  // Dynamically choose action
  const handleSubmitAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    let actionResponse;
    if (isEditing) {
      const formDataToSubmit = new FormData(e.currentTarget);
      formDataToSubmit.set("userId", user!.id!);
      formDataToSubmit.set("role", formData.role);
      actionResponse = await updateUserRole(formDataToSubmit);
    } else {
      actionResponse = await inviteUser(new FormData(e.currentTarget));
    }

    if (actionResponse.success) {
      // Clear the form and close the modal on success
      setFormData({
        firstName: "",
        lastName: "",
        role: "writer",
        email: "",
        password: "",
        confirmPassword: "",
      });
      onSuccess();
    } else {
      console.error("Error during submission:", actionResponse.error);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) return;

    const response = await initiatePasswordReset(
      new FormData().set("email", formData.email)
    );

    if (response.success) {
      alert("Password reset email sent successfully.");
    } else {
      console.error("Error initiating password reset:", response.error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isEditing ? "Edit User" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmitAction}>
          {isEditing && user?.id && (
            <input type="hidden" name="userId" value={user.id} />
          )}

          <div className="mb-4">
            {isEditing && (
              <>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  readOnly
                  className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent opacity-50 cursor-not-allowed mb-4"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  readOnly
                  className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent opacity-50 cursor-not-allowed"
                />
              </>
            )}
          </div>

          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange("role")}
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="writer">Writer</option>
              <option value="sm-manager">SM Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              name="email"
              type="email"
              placeholder={isEditing ? "Email can't change" : "Enter email"}
              value={formData.email}
              readOnly={isEditing}
              onChange={handleChange("email")}
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {isEditing && (
            <div className="mb-4">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="px-4 py-2 bg-primary text-white uppercase rounded-md"
              >
                Initiate Password Reset
              </button>
            </div>
          )}

          <div className="flex justify-end mt-8 gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white uppercase flex justify-center gap-2 items-center rounded-md"
            >
              {isEditing ? "Save Changes" : "Invite User"}
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
