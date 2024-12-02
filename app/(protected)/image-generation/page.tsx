"use client";

import { useState } from "react";

const AiImageGenerator = () => {
  const [model, setModel] = useState("DALL-E 3");
  const [dimensions, setDimensions] = useState("16:9");
  const [numImages, setNumImages] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [recentImages, setRecentImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return alert("Please enter a prompt.");

    setLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, dimensions, numImages, prompt }),
      });
      if (!response.ok) throw new Error("Failed to fetch images.");

      const data = await response.json();
      setRecentImages(data.images); // Update the recent images with API response
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <br />
      <br />
      <div className="flex gap-8">
        <div className="w-[60%]">
          {/* Prompt Input */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={15}
              className="w-full bg-[#F3F3F3] border border-[#12121233] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe your image..."
            ></textarea>
            {/* Generate Button */}
            <button
              onClick={generateImage}
              className="w-[30%] absolute bottom-6 right-4 bg-primary text-white uppercase flex justify-center gap-2 items-center py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[40%]">
          <div className="flex justify-between items-center">
            <p className="capitalize font-bold text-xl">
              Image Generation Preference
            </p>
            <button className="border-2 border-[#12121233] px-6 py-1 rounded-md">
              Reset
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Image Dimensions */}
            <div>
              <p className="capitalize my-2">Image Dimensions</p>
              <div className="flex space-x-4">
                {["2:3", "1:1", "16:9"].map((dim) => (
                  <button
                    key={dim}
                    onClick={() => setDimensions(dim)}
                    className={`px-4 py-2 rounded border ${
                      dimensions === dim
                        ? "bg-primary border-primary text-white"
                        : "bg-[#F3F3F3] border-[#12121233]"
                    }`}
                  >
                    {dim}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Images */}
            <div>
              <p className="capitalize my-2">Number of Images</p>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumImages(num)}
                    className={`px-4 py-2 rounded border ${
                      numImages === num
                        ? "bg-primary border-primary text-white"
                        : "bg-[#F3F3F3] border-[#12121233]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            {/* Model Dropdown */}
            <div>
              <p className="capitalize my-2">Model</p>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 text-[.8rem] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="DALL-E 3">DALL-E 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Generations */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Generations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentImages.map((src, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded overflow-hidden"
            >
              <img src={src} alt={`Generated ${index}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiImageGenerator;
