
"use client";

import { Button, FieldError, Form, Input, InputGroup, Label, TextField,} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email and password sign-in
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const submittedPassword = String(formData.get("password") ?? "");

    if (!email || !submittedPassword) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    try {
      setIsSubmitting(true);

      const { data, error } = await signIn.email({
        email,
        password: submittedPassword,
        rememberMe: true,
        callbackURL: "/profile-info",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      // Redirect after successful sign-in
      router.push("/profile-info");

      console.log("Sign-in successful:", data);
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/profile-info",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google দিয়ে সাইন ইন করার সময় সমস্যা হয়েছে");
    }
  };

  // GitHub sign-in
  const handleGithubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/profile-info",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      toast.error("GitHub দিয়ে সাইন ইন করার সময় সমস্যা হয়েছে");
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold sm:text-2xl">
          সাইন ইন
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Sign-in form */}
      <Form
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-[#fafcfa] p-6"
        onSubmit={onSubmit}
      >
        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "সঠিক ইমেইল ঠিকানা লিখুন";
            }

            return null;
          }}
        >
          <Label>ইমেইল</Label>

          <Input
            className="w-full"
            type="email"
            // placeholder="আপনার ইমেইল লিখুন"
          />

          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          name="password"
          className="w-full"
          validate={(value) => {
            if (!value) {
              return "পাসওয়ার্ড লিখুন";
            }

            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>

          <InputGroup className="w-full">
            <InputGroup.Input
              className="w-full"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
            //   placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                type="button"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() =>
                  setIsPasswordVisible((prev) => !prev)
                }
              >
                {isPasswordVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <FieldError />
        </TextField>

        {/* Submit */}
        <div className="flex w-full justify-center">
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full bg-[#068a3f] font-semibold text-white"
          >
            {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social sign-in */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onPress={handleGoogleSignIn}
          >
            <FcGoogle className="size-5 shrink-0" />
            Google দিয়ে চালিয়ে যান
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onPress={handleGithubSignIn}
          >
            <FaGithub className="size-5 shrink-0" />
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        {/* Sign-up link */}
        <div className="flex w-full flex-wrap justify-center gap-1 text-sm">
          <p className="text-gray-600">অ্যাকাউন্ট নেই?</p>

          <Link
            href="/sign-up"
            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </Form>

      {/* Back to home */}
      <Link
        href="/"
        className="mt-5 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-green-700"
      >
        <IoMdArrowBack className="size-4" />
        হোম পেজে ফিরে যান
      </Link>
      
    </div>
  );
};

export default SignInPage;
