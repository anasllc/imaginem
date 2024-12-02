"use client";
import React, { useState, ChangeEvent } from "react";
import { FaImage } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import styles from "@/app/Home.module.css";

interface UploadedImage {
  file: File;
  preview: string;
  name: string;
  dimensions: string;
  selected: boolean;
}

interface ProcessedImage {
  jpeg: string;
  webp: string;
}

const Home: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<number>(60);
  const [addWatermark, setAddWatermark] = useState<boolean>(false);
  const [addOverlay, setAddOverlay] = useState<boolean>(false);
  const [resizeOption, setResizeOption] = useState<string>("width-1200");
  const [settings, setSettings] = useState({
    resize: resizeOption, // Options: "none", "width-1200", "height-800", "custom"
    compression: compressionLevel, // JPEG/PNG compression (1-100)
    watermark: "none", // Watermark image name
    overlay: "none", // Overlay image name
    width: 1200, // Custom width (if applicable)
    height: 800, // Custom height (if applicable)
    format: "jpeg", // Output format: "jpeg" or "png"
  });
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);

  const calculateImageDimensions = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(`${img.width} x ${img.height}`);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages: UploadedImage[] = await Promise.all(
        files.map(async (file) => ({
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          dimensions: await calculateImageDimensions(file),
          selected: false,
        }))
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleImageSelection = (index: number) => {
    setUploadedImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, selected: !img.selected } : img
      )
    );
  };

  const processImages = async () => {
    const imagesToProcess = uploadedImages.filter((img) => img.selected);

    const formData = new FormData();
    imagesToProcess.forEach((img) => {
      formData.append("images", img.file);
    });

    // Use the existing settings state directly
    formData.append("options", JSON.stringify(settings));

    try {
      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const processedImages = await response.json();
      setProcessedImages(processedImages);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;

    // Use the last part of the URL as the file name, providing a fallback if it's undefined
    const fileName = url.split("/").pop() || "download"; // Default to 'download' if undefined
    link.download = fileName;

    // Append the link to the document body, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <br />
      <br />
      <div className="max-w-[1400px] px-5 xxl:px-0 mx-auto flex justify-between">
        <div className="w-[60%]">
          <div className="w-full h-auto border border-[rgba(0, 0, 0, 0.2)] rounded-md relative">
            <div className="absolute w-full bg-[#fff7f3] z-[-99] h-auto left-0 top-0"></div>
            <div className="w-[97%] h-full py-4 mx-auto">
              <div className="w-full h-[45%] bg-[#FFF7F3] border border-[rgba(0, 0, 0, 0.2)] rounded-md relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="bg-black w-full h-full opacity-0 absolute"
                />
                <div className="w-[50%] mx-auto h-full text-center flex flex-col justify-evenly items-center text-[gray] py-10">
                  <p>Upload or drag and drop images</p>
                  <div className="w-[60%] flex justify-evenly">
                    <div>PNG or JPG</div>
                    <div>Max 5MB</div>
                  </div>
                  <div>
                    <FaImage size={55} />
                  </div>
                </div>
              </div>
              <br /> <br />
              <div className="w-full flex flex-wrap justify-between">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="w-[45%] flex flex-col mb-4">
                    <div className="w-full h-[15rem]">
                      <img
                        src={img.preview}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full flex justify-between mt-5">
                      <p>{img.name}</p>
                      <div>
                        <input
                          type="checkbox"
                          checked={img.selected}
                          onChange={() => toggleImageSelection(index)}
                          className="w-[1.5rem] h-[1.5rem]"
                        />
                      </div>
                    </div>
                    <p>{img.dimensions}</p>
                    <button
                      onClick={() => removeImage(index)}
                      className="self-center w-[5rem] h-[2rem] rounded-[1rem] text-[.8rem] capitalize text-[red] bg-[#E500001A] "
                    >
                      remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br /> <br />
          <div>
            <div className="w-full flex justify-between px-2">
              <div className="flex flex-col gap-4">
                <p>Compression Level</p>
                <p>{resizeOption === "" ? "" : "Resize Option"}</p>
                <p>{addWatermark && "Watermark"}</p>
                <p>{addOverlay && "Overlay"}</p>
              </div>
              <div className="flex flex-col gap-4">
                <p>{compressionLevel}%</p>
                <p>{resizeOption}</p>
                <p>{addWatermark && "Yes"}</p>
                <p>{addOverlay && "Yes"}</p>
              </div>
            </div>
            <button
              onClick={processImages}
              className="w-full h-[3rem] mt-[4rem] rounded-md bg-primary text-white uppercase flex justify-center gap-2 items-center"
            >
              <IoCloudUploadOutline size={20} /> <p>process images</p>
            </button>
          </div>
        </div>

        <div className="w-[35%]">
          <p className="capitalize">image settings</p>
          <br /> <br />
          <div className="w-[80%] mb-6">
            <p className="capitalize mb-3">resize option</p>
            <select
              value={resizeOption}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedValue = e.target.value;
                setResizeOption(selectedValue);

                // Update the settings state to match the correct resize value
                setSettings({
                  ...settings,
                  resize: selectedValue,
                });
              }}
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 text-[.8rem]"
            >
              <option value="">No Resizing</option>
              <option value="width-1200">Width 1200px</option>
              <option value="height-800">Height 800px</option>
              <option value="Fit 1200x800">Fit 1200x800</option>
              <option value="Fill 1200x800">Fill 1200x800</option>
            </select>
          </div>
          <div className="w-[80%]">
            <div className="flex w-full justify-between text-[.9rem]">
              <p>Compression Level (40% recommended)</p>{" "}
              <p>{compressionLevel}%</p>
            </div>
            <div>
              <input
                type="range"
                min="20"
                max="100"
                step="20"
                value={compressionLevel}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCompressionLevel(Number(e.target.value))
                }
                className={`${styles.slider} w-full mt-2`}
              />
            </div>
          </div>
          <div className="w-[80%] mt-[1.3rem]">
            <div className="flex gap-4 text-[.9rem]">
              <input
                type="checkbox"
                checked={addWatermark}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // Update the checkbox state
                  setAddWatermark(e.target.checked);

                  // Update the settings state
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    watermark: e.target.checked ? "watermark1" : "none",
                  }));
                }}
              />
              <p>Add Watermark</p>
            </div>

            {addWatermark && (
              <>
                {/* Watermark settings */}
                <div className="w-full mt-5">
                  <p>Watermark</p>
                  <select
                    value={settings.watermark}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setSettings({
                        ...settings,
                        watermark: e.target.value,
                      })
                    }
                    className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 text-[.8rem] mt-3"
                  >
                    <option value="watermark1">Coinwaft news subtle</option>
                  </select>
                </div>
              </>
            )}
          </div>
          {/* Add Overlay */}
          <div className="w-[80%] mt-[1.3rem]">
            <div className="flex gap-4 text-[.9rem]">
              <input
                type="checkbox"
                checked={addOverlay}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // Update the checkbox state
                  setAddOverlay(e.target.checked);

                  // Update the settings state
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    overlay: e.target.checked ? "overlay1" : "none",
                  }));
                }}
              />
              <p>Add Overlay</p>
            </div>

            {addOverlay && (
              <>
                {/* Overlay settings */}
                <div className="w-full mt-5">
                  <p>Overlay</p>
                  <select
                    value={settings.overlay}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setSettings({
                        ...settings,
                        overlay: e.target.value,
                      })
                    }
                    className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 text-[.8rem] mt-3"
                  >
                    <option value="overlay1">Coinwaft Grid</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="max-w-[1400px] xxl:px-0 mx-auto h-[29rem] border border-[rgba(0, 0, 0, 0.2)] rounded- py-[1rem]">
        <div className="w-[60%] flex flex-wrap justify-between ml-5">
          {processedImages.map((img, index) => (
            <div key={index} className="w-[45%] flex flex-col mb-4">
              <div className="w-full h-[13rem]">
                <img
                  src={img.jpeg}
                  alt={`Processed image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex justify-between mt-5">
                <button
                  className="bg-[#e6ffe2] text-[green] text-[.8rem] w-[5rem] h-[2rem] rounded-[1rem]"
                  onClick={() => downloadImage(img.jpeg)}
                >
                  download JPEG
                </button>
                <button
                  className="bg-[#e6ffe2] text-[green] text-[.8rem] w-[5rem] h-[2rem] rounded-[1rem]"
                  onClick={() => downloadImage(img.webp)}
                >
                  download WebP
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-[40%] h-[3rem] mt-[4rem] rounded-md ml-5 bg-primary text-white uppercase flex justify-center gap-2 items-center"
          onClick={() =>
            processedImages.forEach((img) => downloadImage(img.jpeg))
          }
        >
          download all JPEG
        </button>
        <div className="flex gap-3 ml-5 mt-4 capitalize">
          <p className="text-[.8rem]">Download All as WebP</p>
          <input type="checkbox" />
        </div>
      </div>
    </>
  );
};

export default Home;
