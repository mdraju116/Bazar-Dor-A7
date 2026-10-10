
"use client";

import { Button, Description, InputGroup, FieldError, Form, Input, Label, TextField, } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signUp, signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";


const SignUpPage = () => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Final password match check
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      // Send data to MongoDB through Better Auth
      const { data: responseData, error } = await signUp.email({
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        password: String(data.password ?? ""),
      });

      if (error) {
        console.error("Sign-up error:", error);
        toast.error(error.message || "সাইন আপ করা যায়নি!");
        return;
      }

      toast.success("Successfully Signed Up.");
      console.log("After signed-up:", responseData);

      router.push("/sign-in");
    } catch (error) {
      console.error("Unexpected sign-up error:", error);

      toast.error("সাইন আপ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
    }
  };

  const handleGithubSignIn = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
    }
  };


  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <h3 className="mt-2 text-sm text-gray-600 sm:text-base">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </h3>
      </div>

      <Form
        className="flex w-104 flex-col gap-4 p-6 bg-[#fafcfa] rounded-2xl "
        onSubmit={onSubmit}
      >
        {/* Name */}
        <TextField
          isRequired
          name="name"
          className="w-full"
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
          // placeholder="আপনার নাম লিখুন"
          />
          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>ইমেইল</Label>
          <Input
            className="w-full"
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
            if (value.length < 8) {
              return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
            }
            if (!/[A-Z]/.test(value)) {
              return "কমপক্ষে একটি বড় হাতের ইংরেজি অক্ষর দিন";
            }
            if (!/[0-9]/.test(value)) {
              return "কমপক্ষে একটি সংখ্যা দিন";
            }
            if (!/[^A-Za-z0-9]/.test(value)) {
              return "কমপক্ষে একটি বিশেষ চিহ্ন দিন";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>

          <InputGroup className="w-full">
            <InputGroup.Input
              className="w-full"
              type={isPasswordVisible ? "text" : "password"}
              // placeholder="পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                onPress={() => setIsPasswordVisible((prev) => !prev)}
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

        {/* Confirm Password */}
        <TextField
          isRequired
          name="confirmPassword"
          className="w-full"
          validate={(value) => {
            if (!value) {
              return "পাসওয়ার্ড নিশ্চিত করুন";
            }
            if (value !== password) {
              return " পাসওয়ার্ড মিলছে না";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>

          <InputGroup className="w-full">
            <InputGroup.Input
              className="w-full"
              type={isConfirmPasswordVisible ? "text" : "password"}
              // placeholder="আবার পাসওয়ার্ড লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                type="button"
                aria-label={
                  isConfirmPasswordVisible
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                size="sm"
                variant="ghost"
                onPress={() =>
                  setIsConfirmPasswordVisible((prev) => !prev)
                }
              >
                {isConfirmPasswordVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <Description> কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর, ১টি সংখ্যা এবং ১টি বিশেষ চিহ্ন দিন।</Description>

          <FieldError />
        </TextField>

        {/* Submit */}
        <div className="flex w-full justify-center">
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full bg-[#068a3f] font-semibold text-white"
          >
            {isSubmitting ? "সাইন আপ হচ্ছে..." : "সাইন আপ করুন"}
          </Button>
        </div>

        {/* Divider */}
        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social sign-in buttons */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            className=" p-2"
            onPress={handleGoogleSignIn}
          >
            <FcGoogle />
            Google দিয়ে চালিয়ে যান
          </Button>

          <Button
            type="button"
            variant="outline"
            className="p-2"
            onPress={handleGithubSignIn}
          >
            <FaGithub />
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <div className="flex gap-2 justify-center text-sm">
          <p className="text-gray-600">অ্যাকাউন্ট আছে?{" "} </p>
          <Link href={"/sign-in"} className="font-semibold text-green-700 hover:text-green-800 hover:underline">
            সাইন ইন করুন
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

export default SignUpPage;
