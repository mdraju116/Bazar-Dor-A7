
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  updateUser,
  signOut,
  useSession,
} from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Spinner,
} from "@heroui/react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfileInfoPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  // Update profile name
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdating) return;

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();

    if (name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }

    try {
      setIsUpdating(true);

      const { error } = await updateUser({ name });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      // Refresh session-dependent UI
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    if (isSigningOut) return;

    try {
      setIsSigningOut(true);

      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading session
  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3">
        <Spinner color="success" />
        <span className="text-sm text-gray-500">
          প্রোফাইল লোড হচ্ছে...
        </span>
      </div>
    );
  }

  // Protect page from signed-out users
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-gray-800">
          আপনার অ্যাকাউন্টে সাইন ইন করুন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করতে হবে।
        </p>

        <Link
          href="/sign-in"
          className="mt-5 rounded-xl bg-[#068a3f] px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto  max-w-2xl px-4 py-8 sm:py-12">
      {/* Page heading */}
      <div className="mb-3">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          আমার প্রোফাইল
        </h1>

        <p className="mt-2 text-sm text-gray-600 ">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User information card */}
      <section className="flex flex-col gap-5 rounded-2xl border border-green-100 bg-[#fafcfa] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          {/* Profile image or default icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-2xl text-[#068a3f] sm:h-20 sm:w-20 sm:text-3xl">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User profile"}
                width={80}
                height={80}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <FaUser />
            )}
          </div>

          {/* Name and email */}
          <div className="min-w-0">
            <h2 className="wrap-break text-lg font-bold text-gray-800 sm:text-xl">
              {user.name || "ব্যবহারকারী"}
            </h2>

            <p className="mt-1 break-all text-sm text-gray-500">
              {user.email}
            </p>


          </div>
        </div>

        {/* Sign out */}
        <Button
          type="button"
          onPress={handleSignOut}
          isDisabled={isSigningOut}
          className="rounded border border-red-500 px-3 py-2 text-sm font-semibold text-red-400 bg-white hover:bg-gray-200 "
        >
          {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
        </Button>
      </section>



      {/* update */}
      <div className="mb-3 mt-10">
        <h2 className="  text-lg font-bold text-gray-800 sm:text-xl ">
          তথ্য আপডেট
        </h2>

        <p className="mt-2 text-sm text-gray-600 ">
          আপনার অ্যাকাউন্টের তথ্য এখানে আপডেট করুন।
        </p>
      </div>

      {/* Update profile form */}
      <section className=" rounded-2xl border border-green-100 bg-[#fafcfa] p-5 sm:p-6">


        <Form
          key={user.name ?? ""}
          className="flex w-full max-w-md flex-col justify-center mx-auto gap-4"
          onSubmit={onSubmit}
        >

          <TextField
            name="name"
            className="w-full"
            defaultValue={user.name ?? ""}
            validate={(value) => {
              if (value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }

              return null;
            }}
          >
            <Label>নাম</Label>

            <Input
              className="w-full"
            //   placeholder="আপনার নাম লিখুন"
            />

            <FieldError />
          </TextField>



          <Button
            type="submit"
            isDisabled={isUpdating}
            className="w-full bg-[#068a3f] font-semibold text-white hover:bg-green-700"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : " আপডেট করুন"}
          </Button>
        </Form>
      </section>
    </main>
  );
};

export default ProfileInfoPage;
