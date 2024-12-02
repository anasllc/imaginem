"use client";
import React, { useState } from "react";
import { images } from "@/app/_lib/data";
import { FaImage } from "react-icons/fa";

export const UploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [imageName, setImageName] = useState("");
  const [imageCategory, setImageCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!imageName || !imageCategory || !imageFile) {
      alert("Please fill in all fields");
      return;
    }

    // Generate a temporary URL for the uploaded file
    const imageUrl = URL.createObjectURL(imageFile);

    // Create a new image object
    const newImage = {
      id: (images.length + 1).toString(),
      url: imageUrl,
      name: imageName,
      category: imageCategory.toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    // Add the new image to the local images array
    images.push(newImage);

    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen w-1/3">
        <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-center">
            Upload New Image
          </h2>
          <div className="mb-4">
            <div className="w-full h-[45%] bg-[#FFF7F3] border border-[rgba(0, 0, 0, 0.2)] rounded-md relative">
              <input
                type="file"
                id="imageFile"
                className="bg-black w-full h-full opacity-0 absolute"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <div className="w-[80%] mx-auto h-full text-center flex flex-col gap-2 items-center text-[gray] py-8">
                <p className="text-[1rem]">Upload or drag and drop images</p>
                <div className="w-[60%] flex justify-evenly text-[.9rem]">
                  <div>PNG or JPG</div>
                  <div>Max 5MB</div>
                </div>
                <div>
                  <FaImage size={55} />
                </div>
              </div>
            </div>
            {/* <input
              type="file"
              id="imageFile"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            /> */}
          </div>
          <div className="mb-4">
            <p className="block font-medium mb-3 mt-4">Image information</p>
            <input
              type="text"
              id="imageName"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={imageName}
              placeholder="Image Name/Alias/Tag"
              onChange={(e) => setImageName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <select
              id="imageCategory"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={imageCategory}
              onChange={(e) => setImageCategory(e.target.value)}
            >
              <option value="">Choose image category</option>
              <option value="LOGOS">Logos</option>
              <option value="FLAGS">Flags</option>
              <option value="PEOPLE">People</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-white uppercase flex justify-center gap-2 items-center rounded-md mr-2"
              onClick={handleUpload}
            >
              Upload
            </button>
            <button
              className="px-4 py-2 rounded hover:bg-[#F3F3F3] border border-[#12121233]"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
