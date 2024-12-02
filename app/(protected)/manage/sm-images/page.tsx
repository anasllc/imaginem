"use client";

// import React from "react";
// import ImageGrid from "@/app/components/ImageGrid";
// import { useState } from "react";
// import { Image } from "@/app/_lib/data";

// const ImagesPage: React.FC = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null);

//   const handleAddNewImage = () => {
//     setSelectedImage(null); // Reset selected user
//     setModalOpen(true); // Open the modal for adding a user
//   };

//   const handleEditUser = (image: Image) => {
//     setSelectedImage(image); // Set the user to be edited
//     setModalOpen(true); // Open the modal for editing
//   };

//   // Delete a user
//   const handleDeleteUser = (image: Image) => {
//     setSelectedImage(image); // Set the user to be deleted
//     setDeleteAlertOpen(true); // Open the delete alert
//   };

//   // Confirm user deactivation
//   const confirmDeleteUser = () => {
//     console.log("Delete Image:", selectedImage); // Replace with actual API call
//     setDeleteAlertOpen(false); // Close the alert
//   };

//   return (
//     <div className="p-6 w-full">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold mb-6">Social Media Image Archive</h1>
//         <button
//           onClick={handleAddNewImage}
//           className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
//         >
//           Upload New Image
//         </button>
//       </div>

//       <ImageGrid />
//       {/* User Table
//       <UserTable onEdit={handleEditUser} onDelete={handleDeleteUser} /> */}

//       {/* User Modal
//       {isModalOpen && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={() => setModalOpen(false)}
//         //   user={selectedImage}
//         />
//       )}

//       Delete Alert
//       {isDeleteAlertOpen && (
//         <DeleteAlert
//           isOpen={isDeleteAlertOpen}
//           onClose={() => setDeleteAlertOpen(false)}
//           onConfirm={confirmDeleteUser}
//           // user={selectedUser}
//         />
//       )} */}
//     </div>
//   );
// };

// export default ImagesPage;

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UploadModal } from "@/app/components/UploadModal";
import { EditModal } from "@/app/components/EditModal";
import { WarningModal } from "@/app/components/WarningModal";
import { images } from "@/app/_lib/data";
import ImageCard from "@/app/components/ImageCard";
import { MdDelete } from "react-icons/md";

interface Image {
  id: string;
  url: string;
  name: string;
  category: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [imageList, setImageList] = useState<Image[]>(images);
  const [filter, setFilter] = useState<"all" | "logos" | "flags" | "people">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const filteredImages = images
    .filter((img) => filter === "all" || img.category === filter)
    .filter((img) => img.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return bDate.getTime() - aDate.getTime();
    });

  const handleEditImage = (image: Image) => {
    setSelectedImage(image);
    setShowEditModal(true);
  };

  const handleDeleteImage = (image: Image) => {
    setSelectedImage(image);
    setShowWarningModal(true);
  };

  return (
    <div className="max-w-[1400px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <br />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">
          Social Media Image Archive - Admin
        </h1>
        <button
          className="px-4 py-2 bg-primary text-white uppercase text-[.8rem] flex justify-center gap-2 items-center rounded-md"
          onClick={() => setShowUploadModal(true)}
        >
          Upload New Image
        </button>
      </div>

      <div className="bg-white rounded-lg mb-6">
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for image..."
              className="w-full px-4 py-2 pr-10 rounded-md bg-[#F3F3F3] border border-[#12121233] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-primary border-primary text-white"
                  : "bg-[#F3F3F3] border-[#12121233]"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filter === "logos"
                  ? "bg-primary border-primary text-white"
                  : "bg-[#F3F3F3] border-[#12121233]"
              }`}
              onClick={() => setFilter("logos")}
            >
              Logos
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filter === "flags"
                  ? "bg-primary border-primary text-white"
                  : "bg-[#F3F3F3] border-[#12121233]"
              }`}
              onClick={() => setFilter("flags")}
            >
              Flags
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filter === "people"
                  ? "bg-primary border-primary text-white"
                  : "bg-[#F3F3F3] border-[#12121233]"
              }`}
              onClick={() => setFilter("people")}
            >
              People
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="w-full h-full rounded-md overflow-hidden relative"
            >
              <ImageCard image={image} />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md edit-btn absolute top-2 right-2"
                  onClick={() => handleEditImage(image)}
                >
                  <FaEdit />
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md delete-btn absolute top-2 left-2"
                  onClick={() => handleDeleteImage(image)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
      {showEditModal && selectedImage && (
        <EditModal
          image={selectedImage}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showWarningModal && selectedImage && (
        <WarningModal
          image={selectedImage}
          onDelete={() => {
            // Placeholder for delete functionality
            setImageList(
              imageList.filter((img) => img.id !== selectedImage.id)
            );
            setShowWarningModal(false);
          }}
          onClose={() => setShowWarningModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
