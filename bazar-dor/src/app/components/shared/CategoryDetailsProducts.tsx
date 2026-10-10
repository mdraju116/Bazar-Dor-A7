
"use client";

import { useMemo, useState } from "react";
import { ProductType } from "@/app/types/ProductType";
import ProductCard from "@/app/components/cards/ProductCard";

interface CategoryProductListProps {
  products: ProductType[];
}

type SortOption = "default" | "low-high" | "high-low";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);



const CategoryDetailsProducstList = ({ products, }: CategoryProductListProps) => {
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
        <p className="text-sm font-bold">
          মোট{" "}
          <span className="font-bold ">
            {formatNumber(sortedProducts.length)}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm  font-bold"
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
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>



    </section>
  );
};

export default CategoryDetailsProducstList;

