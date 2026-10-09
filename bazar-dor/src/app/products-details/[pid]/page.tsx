
import { notFound } from "next/navigation";

import BazarCard from "@/app/components/cards/BazarCard";
import PriceCard from "@/app/components/cards/PriceCard";
import SingleProductCard from "@/app/components/cards/SingleProductCard";
import { ProductType } from "@/app/types/ProductType";
import Link from "next/link";

interface ProductDetailsPageProps {
  params: Promise<{ pid: string }>;
}

const ProductDetailsPage = async ({params}: ProductDetailsPageProps) => {

  const { pid } = await params;

  let product: ProductType;

  try {
    const response = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products/${pid}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }

      throw new Error("Failed to fetch product details");
    }

    product = await response.json();
  } catch (error) {
    throw error;
  }

  return (
    <main className=" mt-5 w-full  pb-10 ">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold"
      >
        <Link href={"/"}><span>হোম</span></Link>
        {/* <span>/</span> */}
        {">"}
       <Link href={"/category-details"}> <span>{product.categoryNameBn}</span></Link>
        {">"}
        <span className="font-medium text-green-700">
          {product.nameBn}
        </span>
      </nav>

      {/* Product summary */}
      <section>
        <SingleProductCard product={product} />
      </section>

      {/* Price summary and market prices */}
      <section className="mt-6 rounded-2xl bg-[#fafcfa] p-4 sm:p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>
        </div>

        <PriceCard product={product} />


        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <BazarCard product={product} />
        </div>
      </section>

    </main>
  );
};

export default ProductDetailsPage;

