// app/manage/layout.tsx
// "use client";
import Sidebar from "@/app/components/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">{children}</div>
    </div>
  );
}
