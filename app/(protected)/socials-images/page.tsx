import React from "react";
import ImageGrid from "@/app/components/ImageGrid";

const ImagesPage: React.FC = () => {
  return (
    <main className="max-w-[1400px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <br />
      <br />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Social Media Image Archive
        </h1>
        <ImageGrid />
      </div>
    </main>
  );
};

export default ImagesPage;
