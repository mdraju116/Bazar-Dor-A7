
import Link from "next/link";
import CategoryDetailsProducstList from "@/app/components/shared/CategoryDetailsProducts" 
import { ProductType } from "@/app/types/ProductType";

interface CategoryDetailsPageProps {
  params: Promise<{ cslug: string }>;
}

const CategoryDetailsPage = async ({
  params,
}: CategoryDetailsPageProps) => {
  const { cslug } = await params;

  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(cslug)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: ProductType[] = await response.json();

  // Empty state for invalid or empty categories
  if (products.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
          🛒
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          কোনো পণ্য পাওয়া যায়নি!
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
          এই বিভাগে কোনো পণ্য নেই অথবা বিভাগটি খুঁজে পাওয়া যায়নি।
          অন্য বিভাগ থেকে পণ্যের বর্তমান বাজারদর দেখুন।
        </p>

        <Link
          href="/"
          className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const category = products[0];

  return (
    <main className=" min-h-screen w-full   py-6 ">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500"
      >
        <Link href="/" className="transition hover:text-green-700">
          হোম
        </Link>

        <span aria-hidden="true">&gt;</span>

        <span className="font-medium text-green-700">
          {category.categoryNameBn}
        </span>
      </nav>

      {/* Category header */}
      <section className="flex items-stretch gap-4 rounded-2xl border border-green-100 bg-[#fafcfa] p-4 sm:p-6">
        <div className="flex w-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-3xl sm:w-20 sm:text-4xl">
          {category.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 self-center">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
            {category.categoryNameBn}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            এই বিভাগের {new Intl.NumberFormat("bn-BD").format(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>

          
        </div>
      </section>



      {/* Sort control and product cards */}
      <CategoryDetailsProducstList products={products} />
    </main>
  );
};

export default CategoryDetailsPage;

