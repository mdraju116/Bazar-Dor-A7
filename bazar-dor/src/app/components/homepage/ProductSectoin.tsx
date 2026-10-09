
import { ProductType } from "@/app/types/ProductType";
import ProductCard from "../cards/ProductCard";

const ProductSection = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: ProductType[] = await response.json();

  // Products with increasing prices
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Number(b.change.pct) - Number(a.change.pct))
    .slice(0, 6);

  // Products with decreasing prices
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Number(a.change.pct) - Number(b.change.pct))
    .slice(0, 6);

  return (
    <div className=" mt-8 flex w-full  flex-col gap-10 ">
    {/* <div className=" mt-8 flex w-full  flex-col gap-10 px-4 sm:px-6 lg:px-8"> */}

      {/* Section A: Price Increased */}
      <section>
        <div className="mb-5 flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">▲</span>
          <h2 className="text-xl font-bold sm:text-2xl">
            আজ দাম বেড়েছে
          </h2>
          
        </div>

        {risers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
            আজ কোনো পণ্যের দাম বাড়েনি।
          </p>
        )}
      </section>

      {/* Section B: Price Decreased */}
      <section>
        <div className="mb-5 flex items-center gap-2">
          <span className="text-xl font-bold text-green-600">▼</span>
          <h2 className="text-xl font-bold sm:text-2xl">
            আজ দাম কমেছে
          </h2>
          
        </div>

        {fallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
            আজ কোনো পণ্যের দাম কমেনি।
          </p>
        )}
      </section>



      {/* Section C: All Products */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">
            সব পণ্য
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            মোট {products.length} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

    </div>
  );
};

export default ProductSection;

