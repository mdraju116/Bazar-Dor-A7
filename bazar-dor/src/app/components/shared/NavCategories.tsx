"use client";

import Link from "next/link";
import { usePathname, } from "next/navigation";
import { CategoryType } from "@/app/types/CategoryType";

type Props = {
    categories: CategoryType[];
};

const NavCategory = ({ categories }: Props) => {
    const pathname = usePathname();

    return (
        <nav className="mt-2 border border-gray-100 bg-[#ecf8ec] shadow-sm">
            <div
                className="
                     mx-auto flex max-w-full items-center gap-1 overflow-x-auto px-3 py-2
                     sm:gap-1 md:px-6 lg:px-32 scrollbar-hide"
            >
                {categories.map((category) => {
                    const isActive =
                         pathname === `/category-details/${category.slug}`;

                    return (
                        <Link
                            key={category.id}
                            href={`/category-details/${category.slug}`}
                            className={`
                                    flex shrink-0 items-center gap-1 rounded-md px-3 py-2
                                    text-sm font-bold transition-all duration-200
                                    sm:px-4
                            ${isActive
                                    ? "bg-green-600 text-white shadow-sm"
                                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                                }
                            `}
                        >
                            <span>{category.icon}</span>
                            <span>{category.nameBn}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default NavCategory;