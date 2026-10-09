"use client";

// import { useState } from "react";
import Image from "next/image";
import logo from "../../../../assets/logo-icon.png";
import UserInfo from "./UserInfo";
import Link from "next/link";

const Header = () => {

    // const [date] = useState(() => new Date().toLocaleDateString("bn-BD", { dateStyle: "full", }) );
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

    return (
        <header className="border-b border-gray-100 bg-[#f4f7f5]">
            <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-24">
                
                <Link href={"/"}>
                    {/* Logo + Date */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2dc06d]">
                            <Image
                                src={logo}
                                alt="বাজার দর"
                                width={24}
                                height={24}
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                                বাজার দর
                            </h1>

                            <p className="text-[10px] font-medium text-gray-500 sm:text-xs">
                                {date}
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Auth */}
                <div className="shrink-0">
                    <UserInfo />
                </div>
            </div>
        </header>
    );
};

export default Header;