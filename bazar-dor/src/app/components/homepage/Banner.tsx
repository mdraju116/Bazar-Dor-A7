"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import heroImg from "../../../../assets/bazar-hero.png";

const Banner = () => {
    const [date] = useState(() => new Date().toLocaleDateString("bn-BD", { dateStyle: "full", }));

    return (
        <section
            className="
            my-4 flex flex-col items-center justify-between
            rounded-xl bg-[#fafcfa] px-5 py-2
            md:flex-row md:gap-2
            "
        >
            {/* Left side */}
            <div className="w-full space-y-5 md:w-[60%]">
                <p className="inline-block rounded-full bg-[#068a3f]/10 p-3 text-xs font-semibold text-[#068a3f]">
                    {date}
                </p>

                <h1 className="text-2xl font-bold  text-gray-900 lg:text-3xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="text-sm font-medium text-gray-600 lg:text-base ">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
                    <br />
                    সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                <Link
                    href="#সব-পণ্য"
                    className="
                        inline-flex items-center justify-center
                        rounded-xl bg-[#068a3f] px-4 py-2
                        text-sm font-bold text-white
                        transition-all duration-200
                        hover:bg-[#057536] hover:shadow-md
                    "
                >
                    সব পণ্য দেখুন
                </Link>
            </div>

            {/* Right side */}
            <div className="mt-3 flex w-full justify-center md:mt-0 md:w-[40%] md:justify-end">
                <Image
                    src={heroImg}
                    alt="বাজারের পণ্য"
                    priority
                    className="
            h-auto w-full max-w-60
            sm:max-w-70
            md:max-w-82
            lg:max-w-100
          "
                />
            </div>
        </section>
    );
};

export default Banner;