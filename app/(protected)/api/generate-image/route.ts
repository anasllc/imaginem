import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { model, dimensions, numImages, prompt } = await request.json();

    console.log("Request payload:", { model, dimensions, numImages, prompt });

    // Map dimensions to OpenAI valid sizes
    let size = "1024x1024"; // Default size
    if (dimensions === "16:9") {
      size = "1024x1792"; // Use 1024x1792 for 16:9 aspect ratio
    } else if (dimensions === "1:1") {
      size = "1024x1024"; // 1:1 ratio is 1024x1024
    } else if (dimensions === "4:3") {
      size = "1024x768"; // Use 1024x768 for 4:3 (just as an example)
    }

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3", // Make sure the model name is correct
          prompt: prompt,
          n: numImages,
          size: size,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate images from OpenAI.", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("OpenAI response:", data);

    return NextResponse.json({ images: data.data.map((img: any) => img.url) });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
