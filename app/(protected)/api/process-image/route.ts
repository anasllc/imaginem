import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const settingsString = formData.get("options") as string;
    const settings = JSON.parse(settingsString);

    // Get all uploaded images
    const images = formData.getAll("images") as File[];

    // Process images in parallel
    const processedImages = await Promise.all(
      images.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        /** Step 1: Resize Image **/
        let processed = sharp(buffer);

        if (settings.resize === "width-1200") {
          processed = processed.resize({
            width: 1200,
            height: 680,
            fit: "cover",
          });
        } else if (settings.resize === "height-800") {
          processed = processed.resize({ height: 800 });
        } else if (settings.resize === "custom") {
          processed = processed.resize({
            width: settings.width,
            height: settings.height,
          });
        }

        // Finalize resizing
        const resizedBuffer = await processed.toBuffer();
        let finalizedImage = sharp(resizedBuffer);
        const imageMetadata = await finalizedImage.metadata();

        /** Step 2: Add Watermark **/
        if (settings.watermark !== "none") {
          const watermarkPath = path.join(
            process.cwd(),
            "public",
            "watermarks",
            `${settings.watermark}.png`
          );

          if (fs.existsSync(watermarkPath)) {
            try {
              const watermarkMetadata = await sharp(watermarkPath).metadata();

              // Resize watermark to fit the resized image
              const targetWidth = Math.round(imageMetadata.width * 0.15);
              const resizedWatermarkBuffer = await sharp(watermarkPath)
                .resize({
                  width: targetWidth,
                  height: Math.round(
                    targetWidth *
                      (watermarkMetadata.height / watermarkMetadata.width)
                  ),
                })
                .toBuffer();

              // Position the watermark
              const padding = 50;
              const left = imageMetadata.width - targetWidth - padding;
              const top =
                imageMetadata.height -
                Math.round(
                  targetWidth *
                    (watermarkMetadata.height / watermarkMetadata.width)
                ) -
                padding;

              // Add watermark to the image
              finalizedImage = sharp(await finalizedImage.toBuffer()).composite(
                [{ input: resizedWatermarkBuffer, top, left }]
              );
            } catch (error) {
              console.error("Error applying watermark:", error);
            }
          } else {
            console.error(`Watermark file not found: ${watermarkPath}`);
          }
        }

        // Finalize watermarking
        const watermarkedBuffer = await finalizedImage.toBuffer();
        finalizedImage = sharp(watermarkedBuffer);

        /** Step 3: Add Overlay **/
        if (settings.overlay !== "none") {
          const overlayPath = path.join(
            process.cwd(),
            "public",
            "overlays",
            `${settings.overlay}.png`
          );

          if (fs.existsSync(overlayPath)) {
            try {
              // Resize overlay to match the dimensions of the image
              const resizedOverlayBuffer = await sharp(overlayPath)
                .resize({
                  width: imageMetadata.width,
                  height: imageMetadata.height,
                  fit: "cover",
                })
                .toBuffer();

              // Apply overlay to completely cover the image
              finalizedImage = finalizedImage.composite([
                { input: resizedOverlayBuffer },
              ]);
            } catch (error) {
              console.error("Error applying overlay:", error);
            }
          } else {
            console.error(`Overlay file not found: ${overlayPath}`);
          }
        }

        // Finalize overlay
        const overlayedBuffer = await finalizedImage.toBuffer();
        finalizedImage = sharp(overlayedBuffer);

        /** Step 4: Compression and Format Conversion **/
        if (settings.format === "jpeg") {
          finalizedImage = finalizedImage.jpeg({
            quality: settings.compression,
          });
        } else if (settings.format === "png") {
          finalizedImage = finalizedImage.png({
            compressionLevel: Math.round(settings.compression / 10),
          });
        }

        // Convert to JPEG and WebP
        const [jpegBuffer, webpBuffer] = await Promise.all([
          finalizedImage.toBuffer(),
          sharp(await finalizedImage.toBuffer())
            .webp()
            .toBuffer(),
        ]);

        return {
          jpeg: `data:image/jpeg;base64,${jpegBuffer.toString("base64")}`,
          webp: `data:image/webp;base64,${webpBuffer.toString("base64")}`,
        };
      })
    );

    // Filter out null or failed images
    const validProcessedImages = processedImages.filter((img) => img !== null);

    // Return processed images
    return NextResponse.json(validProcessedImages);
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { error: "Image processing failed" },
      { status: 500 }
    );
  }
}
