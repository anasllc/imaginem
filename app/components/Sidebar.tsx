"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed h-full w-64 bg-[#230B00] text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Panel
      </h1>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/manage/users"
              className={`block px-4 py-2 rounded ${
                pathname === "/manage/users"
                  ? "bg-primary"
                  : "hover:bg-gray-700"
              }`}
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/manage/sm-images"
              className={`block px-4 py-2 rounded ${
                pathname === "/manage/sm-images"
                  ? "bg-primary"
                  : "hover:bg-gray-700"
              }`}
            >
              Manage SM Images
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
