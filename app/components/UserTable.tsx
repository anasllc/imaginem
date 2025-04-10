"use client";

import React, { useState } from "react";
import UserModal from "./UserModal";
import DeleteAlert from "./DeleteAlert";
import { UsersType } from "../_lib/types";

interface UserTableProps {
  users: UsersType[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersType | null>(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEditUser = (user: UsersType) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDeleteUser = (user: UsersType) => {
    setSelectedUser(user);
    setDeleteAlertOpen(true);
  };

  const confirmDeleteUser = () => {
    console.log("Deactivated user:", selectedUser);
    setDeleteAlertOpen(false);
  };

  const handleSuccess = () => {
    console.log("Success! Clearing form and closing modal.");
    setModalOpen(false);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-primary text-white uppercase flex text-[.8rem] justify-center gap-2 items-center rounded-md"
        >
          Invite New User
        </button>
      </div>
      {/* User Table */}
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
                    user.role === "writer"
                      ? "bg-blue-100 w-fit px-3 py-1 rounded-xl"
                      : user.role === "sm-manager"
                      ? "bg-green-100 w-fit px-3 py-1 rounded-xl"
                      : user.role === "admin"
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
                  onClick={() => handleEditUser(user)}
                  className="text-green-500 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Modal */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          user={selectedUser}
          onSuccess={handleSuccess}
        />
      )}

      {/* Delete Alert */}
      {isDeleteAlertOpen && (
        <DeleteAlert
          isOpen={isDeleteAlertOpen}
          onClose={() => setDeleteAlertOpen(false)}
          onConfirm={confirmDeleteUser}
          // user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserTable;
