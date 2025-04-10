import React from "react";
import DashboardClient from "@/app/components/DashboardClient";
import { activeUser } from "@/app/_lib/data";

export default async function Page() {
  const user = await activeUser();

  return (
    <div className="max-w-[1200px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <DashboardClient user={user} />
    </div>
  );
}
