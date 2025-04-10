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
      // Fetch the image
      const response = await fetch(url);
      const blob = await response.blob();

      // Create an image element
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = URL.createObjectURL(blob);

      img.onload = async () => {
        // Create a canvas to process the image
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        // Convert canvas to blob
        canvas.toBlob(async (canvasBlob) => {
          if (canvasBlob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  "image/png": canvasBlob,
                }),
              ]);
              // alert("Image copied to clipboard!");
            } catch (clipboardError) {
              console.error("Clipboard write failed:", clipboardError);
              // alert("Could not copy image");
            }
          }
        }, "image/png");
      };

      img.onerror = () => {
        // alert("Failed to load image");
        console.log("Failed to load image");
      };
    } catch (error) {
      console.error("Image copy error:", error);
      // alert("Could not copy image");
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
