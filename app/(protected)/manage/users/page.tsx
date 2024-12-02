"use client";

import React, { useState } from "react";
import UserTable from "@/app/components/UserTable";
import UserModal from "@/app/components/UserModal";
import DeleteAlert from "@/app/components/DeleteAlert";

// Define User type
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "Writer" | "SM Manager" | "Admin"; // Add role types
};

const UsersPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Add a new user
  const handleAddUser = () => {
    setSelectedUser(null); // Reset selected user
    setModalOpen(true); // Open the modal for adding a user
  };

  // Edit an existing user
  const handleEditUser = (user: User) => {
    setSelectedUser(user); // Set the user to be edited
    setModalOpen(true); // Open the modal for editing
  };

  // Delete a user
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user); // Set the user to be deleted
    setDeleteAlertOpen(true); // Open the delete alert
  };

  // Confirm user deactivation
  const confirmDeleteUser = () => {
    console.log("Deactivated user:", selectedUser); // Replace with actual API call
    setDeleteAlertOpen(false); // Close the alert
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-primary text-white uppercase flex text-[.8rem] justify-center gap-2 items-center rounded-md"
        >
          Add New User
        </button>
      </div>
      {/* User Table */}
      <UserTable onEdit={handleEditUser} onDelete={handleDeleteUser} />

      {/* User Modal */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          user={selectedUser}
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

export default UsersPage;
