"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CategoryType } from "../../types/CategoryType";

interface NavCategoryProps {
  categories: CategoryType[];
}

export default function NavCategory({ categories }: NavCategoryProps) {
  const pathname = usePathname();

  if (!categories?.length) return null;

  return (
    <nav className="mt-2 border border-gray-100 bg-[#ecf8ec] shadow-sm">
      <div className="mx-auto flex max-w-full items-center gap-1 overflow-x-auto whitespace-nowrap px-3 py-2 scrollbar-hide md  lg:px-32">
        {categories.map((category) => {
          const href = `/category-details/${category.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.id}
              href={href}
              className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}