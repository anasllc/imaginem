"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [role] = useState("Writer");
  const [email] = useState("johndoe@gmail.com");
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // const [randomImageUrl, setRandomImageUrl] = useState("");

  // useEffect(() => {
  //   // Fetch a random NFT-style image on component load or reload
  //   const fetchRandomImage = async () => {
  //     try {
  //       // Replace this API with an NFT-style placeholder API if necessary
  //       const response = await fetch("https://picsum.photos/200");
  //       if (response.ok) {
  //         setRandomImageUrl(response.url); // Directly use the URL
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch random image:", error);
  //     }
  //   };

  //   fetchRandomImage();
  // }, []); // Runs only once on component mount

  const handleNameSave = () => {
    setIsEditingName(false);
    // Add logic to save name changes here
  };

  const handlePasswordSave = () => {
    setIsUpdatingPassword(false);
    setPasswordFields({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    // Add logic to update password here
  };

  return (
    <div className="max-w-[600px] px-5 xxl:px-0 mx-auto flex flex-col justify-between">
      <br />
      <br />
      <h1 className="text-2xl font-semibold mb-4">Hi, {firstName}</h1>
      {/* <div className="w-full my-2 flex justify-center">
        {randomImageUrl ? (
          <img
            src={randomImageUrl}
            alt="Random Avatar"
            className="w-full h-32 rounded-sm border"
          />
        ) : (
          <p>Loading avatar...</p>
        )}
      </div> */}
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>First Name:</strong> {firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {lastName}
        </p>
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => setIsUpdatingPassword(!isUpdatingPassword)}
          className="px-4 py-2 bg-primary text-white uppercase text-[.9rem] flex justify-center gap-2 items-center rounded-md"
        >
          Update Password
        </button>
        <button
          onClick={() => setIsEditingName(!isEditingName)}
          className="px-4 py-2 rounded hover:bg-[#F3F3F3] text-[.9rem] border border-[#12121233]"
        >
          Edit Name
        </button>
      </div>

      {isEditingName && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Edit Name</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleNameSave}
              className="px-4 py-2 bg-primary text-white uppercase text-[.8rem] flex justify-center gap-2 items-center rounded-md"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="px-4 py-2 rounded hover:bg-[#F3F3F3] text-[.8rem] border border-[#12121233]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isUpdatingPassword && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Update Password</h2>
          <div className="space-y-2">
            <input
              type="password"
              value={passwordFields.oldPassword}
              onChange={(e) =>
                setPasswordFields((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
              }
              placeholder="Old Password"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="password"
              value={passwordFields.newPassword}
              onChange={(e) =>
                setPasswordFields((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              placeholder="New Password"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="password"
              value={passwordFields.confirmPassword}
              onChange={(e) =>
                setPasswordFields((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm New Password"
              className="bg-[#F3F3F3] border border-[#12121233] w-full h-[2.6rem] pl-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handlePasswordSave}
              className="px-4 py-2 bg-primary text-white uppercase text-[.8rem] flex justify-center gap-2 items-center rounded-md"
            >
              Save New Password
            </button>
            <button
              onClick={() => setIsUpdatingPassword(false)}
              className="px-4 py-2 rounded hover:bg-[#F3F3F3] text-[.8rem] border border-[#12121233]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
