import { redirect } from "next/navigation";

// This component performs a server-side redirect to `/manage/users`
export default function ManagePage() {
  redirect("/manage/users");
  return null; // Return null to satisfy the React component requirement
}

// import React from "react";

// function page() {
//   return <div>page</div>;
// }

// export default page;
