"use client";

import React, { useState } from "react";
import { images } from "@/app/_lib/data";

interface Image {
  id: string;
  url: string;
  name: string;
  category: string;
  createdAt: string;
}

export const EditModal: React.FC<{ image: Image; onClose: () => void }> = ({
  image,
  onClose,
}) => {
  const [imageName, setImageName] = useState(image.name);
  const [imageCategory, setImageCategory] = useState(
    image.category.toUpperCase()
  );

  const handleSave = () => {
    // Find the index of the image in the images array
    const imageIndex = images.findIndex((img) => img.id === image.id);

    if (imageIndex !== -1) {
      // Update the image in the local images array
      images[imageIndex] = {
        ...images[imageIndex],
        name: imageName,
        category: imageCategory.toLowerCase(),
      };
    }

    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen w-1/3">
        <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-3 text-center">Edit Image</h2>
          <img src={image.url} alt="" className="" />
          <div className="mb-4">
            <p className="block font-medium mb-3 mt-4">Image information</p>
            <input
              type="text"
              id="imageName"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={imageName}
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
              <option value="LOGOS">Logos</option>
              <option value="FLAGS">Flags</option>
              <option value="PEOPLE">People</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-white uppercase flex justify-center gap-2 items-center rounded-md mr-2"
              onClick={handleSave}
            >
              Save Changes
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
