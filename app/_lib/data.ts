import { createClient } from "@/utils/supabase/server"; // Import server client
import { redirect } from "next/navigation";
import { UserType } from "@/app/_lib/types";
import { UsersType } from "@/app/_lib/types";

export async function activeUser(): Promise<UserType> {
  const supabase = await createClient();

  // Fetch authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
    throw new Error("User not authenticated"); // Fallback for TypeScript
  }

  const { data: userData, error: userFetchError } = await supabase
    .from("users")
    .select(
      "first_name, last_name, email, role, img_gen_left_today, total_img_gen"
    )
    .eq("id", user.id)
    .single();

  if (userFetchError || !userData) {
    redirect("/login");
    throw new Error("Failed to fetch user data"); // Fallback for TypeScript
  }

  return {
    firstName: userData.first_name || "Unknown",
    lastName: userData.last_name || "User",
    imagesLeft: userData.img_gen_left_today || 0,
    totalImagesGenerated: userData.total_img_gen || 0,
    email: userData.email || "email",
    role: userData.role || "writer",
  };
}

export async function fetchAllUsers(): Promise<UsersType[]> {
  const supabase = await createClient();

  // Fetch all users from the database
  const { data: users, error } = await supabase
    .from("users")
    .select(
      "id, first_name, last_name, email, role, img_gen_left_today, total_img_gen"
    );

  if (error || !users) {
    console.error("Error fetching users:", error);
    redirect("/login");
    throw new Error("Failed to fetch users");
  }

  // Map and return users in expected structure
  return users.map((user) => ({
    id: user.id,
    firstName: user.first_name || "Unknown",
    lastName: user.last_name || "User",
    email: user.email || "email",
    role: user.role || "writer",
    imagesLeft: user.img_gen_left_today || 0,
    totalImagesGenerated: user.total_img_gen || 0,
  }));
}

export type Image = {
  id: string;
  url: string;
  name: string;
  category: "logos" | "flags" | "people";
  createdAt: string;
};

// export const images: Image[] = [
//   {
//     id: "1",
//     url: "/logos/XRP.jpg",
//     name: "XRP Logo",
//     category: "logos",
//     createdAt: "2024-11-29T12:00:00Z",
//   },
//   {
//     id: "2",
//     url: "/logos/Metaplanet.jpg",
//     name: "MetaPlanet Logo",
//     category: "logos",
//     createdAt: "2024-11-30T10:00:00Z",
//   },
//   {
//     id: "3",
//     url: "/logos/BabyDoge.jpg",
//     name: "BabyDoge",
//     category: "flags",
//     createdAt: "2024-11-28T08:00:00Z",
//   },
// ];

const categories: Array<"logos" | "flags" | "people"> = [
  "logos",
  "flags",
  "people",
];

// Helper function to generate random category
const getRandomCategory = () =>
  categories[Math.floor(Math.random() * categories.length)];

// Predefined file list from the "logos" folder
const logoFiles = [
  "XRP.jpg",
  "Metaplanet.jpg",
  "BabyDoge.jpg",
  "Ethereum.jpg",
  "Best Friends.jpg",
  "Binance.jpg",
  "Bitcoin.jpg",
  "Bitwise.jpg",
  "BlackRock.jpg",
  "BNB.jpg",
  "Cardano Horizontal.jpg",
  "Cardano Vertical.jpg",
  "Dogecoin.jpg",
  "Dogs Memecoin.jpg",
  "FCA.jpg",
  "Floki.jpg",
  "Kraken Horizontal.jpg",
  "Kraken Vertical.jpg",
  "Ledger.jpg",
  "MARA.jpg",
  "Metamask Dark.jpg",
  "Metamask.jpg",
  "Microstrategy.jpg",
  "MoonPay.jpg",
  "OKX.jpg",
  "Porsche.jpg",
  "PumpFun.jpg",
  "Solana Black.jpg",
  "Solana White.jpg",
  "Tether.jpg",
  "Ton.jpg",
  "Trezor Horizontal.jpg",
  "Trezor Vertical.jpg",
  "Tron.jpg",
  "Uniswap Horizontal.jpg",
  "Uniswap Vertical.jpg",
  "Venmo.jpg",
];

export const images: Image[] = logoFiles.map((file, index) => {
  const fileName = file.split(".")[0]; // Get the name without extension
  return {
    id: `${index + 1}`, // Generate a unique ID
    url: `/logos/${file}`, // Map the file to the correct URL path
    name: `${fileName} Logo`, // Derive the name from the file name
    category: getRandomCategory(), // Assign a random category
    createdAt: new Date().toISOString(), // Use current date for createdAt
  };
});
