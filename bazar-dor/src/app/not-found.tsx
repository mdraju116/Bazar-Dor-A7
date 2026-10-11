
import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-50 sm:h-40 sm:w-40">
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-green-200" />

          <FaShoppingBasket className="text-5xl text-[#068a3f] sm:text-6xl" />

          <div className="absolute right-1 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm sm:right-2">
            <HiOutlineMagnifyingGlass className="text-xl text-gray-500" />
          </div>
        </div>

        {/* Error message */}
        <p className="text-7xl font-extrabold tracking-tight text-[#068a3f] sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          পেজটি সরানো হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
        </p>

        {/* Home button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#068a3f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            <IoHomeOutline className="text-lg" />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Brand footer */}
        <div className="mt-10 border-t border-gray-100 pt-5">
          <p className="text-sm font-semibold text-gray-700">
            🛒 বাজার <span className="text-[#068a3f]">দর</span>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            আপনার নিত্যপ্রয়োজনীয় বাজারের দামের নির্ভরযোগ্য ঠিকানা।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
