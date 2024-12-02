"use client";

import React, { useState } from "react";
import { images } from "@/app/_lib/data";
import ImageCard from "./ImageCard";

const ImageGrid: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "logos" | "flags" | "people">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images
    .filter((img) => filter === "all" || img.category === filter)
    .filter((img) => img.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return bDate.getTime() - aDate.getTime();
    });

  return (
    <div>
      <div className="my-12 flex flex-col items-center justify-center gap-4">
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
            className="w-full h-full rounded-md overflow-hidden"
          >
            <ImageCard image={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
