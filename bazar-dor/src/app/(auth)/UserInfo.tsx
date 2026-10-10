
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { Spinner,Button } from "@heroui/react";
import { FaUser } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const UserInfo = () => {
  const { data: session, isPending } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await signOut();

      if (error) {
        console.error("Sign-out error:", error);
        return;
      }

      setIsDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <Spinner color="success" size="sm" />
        <span className="text-xs text-gray-500">Loading...</span>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <>
          {/* User avatar, name and dropdown */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-label="Open user menu"
            className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-gray-100"
          >
            {/* Show real image or default user icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-50 text-[#068a3f]">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User profile"}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <FaUser className="text-lg" />
              )}
            </div>

            <span className="max-w-28 truncate text-sm font-semibold text-gray-800">
              {user.name?.trim().split(/\s+/)[0] || "ব্যবহারকারী"}
            </span>

            <MdArrowDropDown
              className={`text-2xl text-gray-600 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown card */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
              {/* Full name and email */}
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-50 text-[#068a3f]">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User profile"}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <FaUser className="text-lg" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {user.name || "ব্যবহারকারী"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Profile link */}
              <Link
                href="/profile-info"
                onClick={() => setIsDropdownOpen(false)}
                className="mt-2 block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-[#068a3f] text-center"
              >
                প্রোফাইল দেখুন
              </Link>

              {/* Sign out */}
              <Button
                type="button"
                onPress={handleSignOut}
                isDisabled={isSigningOut}
                className="w-full rounded border border-red-500 px-3 py-2 text-sm font-semibold text-red-400 bg-white hover:bg-gray-200 "
              >
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </Button>
            </div>
          )}
        </>
      ) : (
        /* Signed-out buttons */
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-xl border border-[#068a3f] px-3 py-2 text-sm font-semibold text-[#068a3f] transition-colors hover:bg-green-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-xl bg-[#068a3f] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
