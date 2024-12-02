// app/api/quote/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://zenquotes.io/api/quotes/inspiration",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensures fresh quote each time
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();

    return NextResponse.json(
      {
        quote: data[0]?.q || "Believe you can and you're halfway there.",
        author: data[0]?.a || "Theodore Roosevelt",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote fetch error:", error);
    return NextResponse.json(
      {
        quote:
          "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        author: "Christian D. Larson",
      },
      { status: 500 }
    );
  }
}
