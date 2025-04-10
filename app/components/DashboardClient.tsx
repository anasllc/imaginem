"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserType } from "../_lib/types";

interface DashboardClientProps {
  user: UserType;
}

function getFormattedDateTime(): { time: string; date: string } {
  const now = new Date();
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return {
    time: now.toLocaleTimeString("en-US", timeOptions),
    date: now.toLocaleDateString("en-US", dateOptions),
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [timeInfo, setTimeInfo] = useState<{
    time: string;
    date: string;
  } | null>(null);
  const [quote, setQuote] = useState({
    quote: "Loading quote...",
    author: "Loading...",
  });

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTimeInfo(getFormattedDateTime());
    }, 1000);

    // Fetch a random quote
    const fetchQuote = async () => {
      try {
        const response = await fetch("/api/quote");
        const data = await response.json();
        setQuote({
          quote: data.quote,
          author: data.author,
        });
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote({
          quote:
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
          author: "Winston Churchill",
        });
      }
    };

    fetchQuote();

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="max-w-[1200px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <div className="bg-[#FFF7F3] my-8 rounded-lg flex justify-between py-8 px-8">
        <div className="flex flex-col justify-between w-[30%]">
          <div>
            <p className="text-2xl font-bold">Hi {user.firstName}</p>
            <p className="opacity-[60%]">Welcome back</p>
          </div>
          <div>
            <p className="italic text-sm">"{quote.quote}"</p>
            <p className="text-right text-xs mt-1">- {quote.author}</p>
          </div>
        </div>
        <div className="flex justify-between space-x-8">
          <div className="bg-[#230B00] text-white p-4 w-[11rem] h-[9rem] rounded-lg text-center flex flex-col justify-between">
            <p className="text-5xl font-black">{user.imagesLeft} / 6</p>
            <p className="text-sm w-[90%] mx-auto">
              Image Generation left today
            </p>
          </div>
          <div className="bg-[#230B00] text-white p-4 w-[11rem] h-[9rem] rounded-lg text-center flex flex-col justify-between">
            <p className="text-5xl font-black">{user.totalImagesGenerated}</p>
            <p className="text-sm w-[90%] mx-auto">Images generated so far</p>
          </div>
          <div className="bg-[#A8FFB3] p-4 w-[11rem] h-[9rem] rounded-lg text-center flex flex-col justify-between">
            {timeInfo ? (
              <>
                <p className="text-5xl font-black">{timeInfo.time}</p>
                <p className="text-sm uppercase">{timeInfo.date}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">All Tools</h2>
        <div className="grid grid-cols-3 my-4 gap-4">
          <Link
            href="/image-generation"
            className="bg-white shadow-xl p-6 rounded-lg cursor-pointer"
          >
            <p className="text-lg font-semibold mb-2">AI Image Generator</p>
            <p className="text-sm opacity-[80%]">
              You can define a layout by default exporting a React component
              from a layout.js file.
            </p>
          </Link>
          <Link
            href="/image-optimizer"
            className="bg-white shadow-xl p-6 rounded-lg cursor-pointer"
          >
            <p className="text-lg font-semibold mb-2">Image Resizing</p>
            <p className="text-sm opacity-[80%]">
              You can define a layout by default exporting a React component
              from a layout.js file.
            </p>
          </Link>
          <Link
            href="/image-optimizer"
            className="bg-white shadow-xl p-6 rounded-lg cursor-pointer"
          >
            <p className="text-lg font-semibold mb-2">Image Watermaking</p>
            <p className="text-sm opacity-[80%]">
              You can define a layout by default exporting a React component
              from a layout.js file.
            </p>
          </Link>
          <Link
            href="/image-optimizer"
            className="bg-white shadow-xl p-6 rounded-lg cursor-pointer"
          >
            <p className="text-lg font-semibold mb-2">Image Compression</p>
            <p className="text-sm opacity-[80%]">
              You can define a layout by default exporting a React component
              from a layout.js file.
            </p>
          </Link>
          <Link
            href="/socials-images"
            className="bg-white shadow-xl p-6 rounded-lg cursor-pointer"
          >
            <p className="text-lg font-semibold mb-2">Social Media Images</p>
            <p className="text-sm opacity-[80%]">
              You can define a layout by default exporting a React component
              from a layout.js file.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
