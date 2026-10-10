
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { MdBalance } from "react-icons/md";
import heroImg from "../../../../assets/bazar-hero.png";

const API_BASE ="https://openapi.programming-hero.com/api/bazardor";

type MarketInfo = {
    market?: string;
};

type Product = {
    id?: string | number;
    markets?: MarketInfo[];
};

type Category = {
    id?: string | number;
    slug?: string;
};

const Banner = () => {
    const { data: session, isPending } = useSession();

    const isLoggedIn = Boolean(session?.user);


    const [productCount, setProductCount] = useState(0);
    const [marketCount, setMarketCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        fetch(`${API_BASE}/products`),
                        fetch(`${API_BASE}/categories`),
                    ]);

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error("Failed to fetch statistics");
                }

                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                // Extract arrays from common API response structures
                const products: Product[] = Array.isArray(productsData)
                    ? productsData
                    : productsData.products ??
                    productsData.data?.products ??
                    productsData.data ??
                    [];

                const categories: Category[] = Array.isArray(categoriesData)
                    ? categoriesData
                    : categoriesData.categories ??
                    categoriesData.data?.categories ??
                    categoriesData.data ??
                    [];

                // Count unique markets
                const uniqueMarkets = new Set<string>();

                products.forEach((product) => {
                    product.markets?.forEach((marketInfo) => {
                        const marketName = marketInfo.market?.trim();

                        if (marketName) {
                            uniqueMarkets.add(marketName);
                        }
                    });
                });

                setProductCount(products.length);
                setMarketCount(uniqueMarkets.size);
                setCategoryCount(categories.length);
            } catch (error) {
                console.error(
                    "Failed to load Bazar Dor statistics:",
                    error
                );
            }
        };

        fetchStatistics();
    }, []);

    const statistics = [
    {
        title: "পণ্য",
        count: productCount,
        description: "টি নিত্যদিনের পণ্য",
        icon: "🛒",
    },
    {
        title: "বাজার",
        count: marketCount,
        description: "টি বাজার অন্তর্ভুক্ত",
        icon: "🏪",
    },
    {
        title: "বিভাগ",
        count: categoryCount,
        description: "টি বিভাগের তথ্য",
        icon: "📊",
    },
];

return (
    <section
        className="
            my-4 flex flex-col items-center justify-between
            gap-5 rounded-2xl bg-[#fafcfa] px-5 py-4
            md:flex-row md:gap-2 md:py-5
        "
    >
        {/* Left side */}
        <div className="w-full space-y-4 md:w-[60%]">
            {date && (
                <p className="inline-block rounded-full bg-[#068a3f]/10 p-3 text-xs font-semibold text-[#068a3f]">
                    {date}
                </p>
            )}

            <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm font-medium leading-7 text-gray-600 lg:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
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

                {!isPending && isLoggedIn && (
                    <Link
                        href="/market-comparison"
                        className="
                            inline-flex items-center justify-center
                            rounded-xl border border-[#068a3f]
                            px-4 py-2 text-sm font-bold
                             transition-all duration-200
                            hover:bg-[#068a3f]/10 hover:shadow-sm gap-1
                        "
                    >
                       <MdBalance /> বাজার তুলনা 
                    </Link>
                )}
            </div>
        </div>

        {/* Right side */}
        <div className="mt-2 flex w-full justify-center md:mt-0 md:w-[40%] md:justify-end">
            {isPending ? (
                // Prevent showing the wrong content while checking the session
                <div className="h-36 w-full max-w-md animate-pulse rounded-xl bg-gray-100" />
            ) : isLoggedIn ? (
                // Statistics card for authenticated users
                <div className="grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
                    {statistics.map((item) => (
                        <div
                            key={item.title}
                            className="
                                flex min-w-0 flex-col items-center justify-center
                                rounded-xl border border-green-100 bg-white
                                px-2 py-5 text-center shadow-sm
                                transition-all duration-200
                                hover:-translate-y-1 hover:shadow-md
                                sm:px-3 sm:py-6
                                "
                    >
                            

                            <h2 className="text-sm font-semibold text-gray-600 sm:text-base">
                                {item.title}
                            </h2>

                            <p className="my-1 text-2xl font-extrabold text-[#068a3f] sm:text-3xl">
                                {item.count.toLocaleString("bn-BD")}
                            </p>

                            <p className="text-[10px] leading-4 text-gray-500 sm:text-xs">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                // Hero image for guests
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
            )}
        </div>
    </section>
);
};

export default Banner;
