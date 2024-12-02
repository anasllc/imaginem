import React from "react";

type Props = {
  image: {
    id: string;
    url: string;
    name: string;
  };
};

const ImageCard: React.FC<Props> = ({ image }) => {
  const handleCopy = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      alert("Image copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy image:", error);
    }
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <div
      className="relative group cursor-pointer border rounded-md overflow-hidden shadow-sm hover:shadow-lg transition"
      onClick={() => handleCopy(image.url)}
      onDoubleClick={() => handleDownload(image.url, image.name)}
    >
      <img
        src={image.url}
        alt={image.name}
        className="w-full h-auto object-cover"
      />
      <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-1 text-sm opacity-0 group-hover:opacity-100 transition">
        {image.name}
      </div>
    </div>
  );
};

export default ImageCard;
