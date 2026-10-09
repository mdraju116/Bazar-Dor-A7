
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductType } from "@/app/types/ProductType";

interface CategoryProductListProps {
  products: ProductType[];
}

type SortOption = "default" | "low-high" | "high-low";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const getBanglaUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
    packet: "প্যাকেট",
  };

  return units[unit.toLowerCase()] || unit;
};

const CategoryProductList = ({
  products,
}: CategoryProductListProps) => {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section className="mt-6">
      {/* Sort control */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          মোট{" "}
          <span className="font-bold text-gray-900">
            {formatNumber(sortedProducts.length)}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <article
              key={product.id}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              {/* Product information */}
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                  {product.categoryIcon || "🛒"}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-gray-800">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {getBanglaUnit(product.unit)}
                  </p>
                </div>
              </div>

              {/* Today's price */}
              <div className="mt-5 rounded-xl bg-[#fafcfa] p-4">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-2xl font-bold text-green-700">
                    {formatNumber(product.today)}
                    <span className="ml-1 text-sm font-medium">
                      টাকা
                    </span>
                  </p>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}

                    {formatNumber(Math.abs(product.change.pct))}%
                  </span>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  গত সপ্তাহে: {formatNumber(product.lastWeek)} টাকা
                </p>
              </div>

              {/* Product details link */}
              <Link
                href={`/product-details/${product.id}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                বিস্তারিত দেখুন
                <span className="ml-2" aria-hidden="true">
                  &gt;
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryProductList;

