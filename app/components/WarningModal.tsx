// components/WarningModal.tsx
import React from "react";

interface Image {
  id: string;
  name: string;
  category: string;
  src: string;
}

export const WarningModal: React.FC<{
  image: Image;
  onDelete: () => void;
  onClose: () => void;
}> = ({ image, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen w-1/3">
        <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-red-500 mb-4 text-center">
            Warning!
          </h2>
          <p className="mb-6">
            You're about to delete the image "{image.name}". Please note that
            this action cannot be undone.
          </p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-[#FF1717] text-white uppercase flex justify-center gap-2 items-center rounded-md mr-4"
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              Yes Delete
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
