
function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Product icon and name */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
      </div>

      {/* Price */}
      <div className="mb-3 h-6 w-2/3 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-100" />

      {/* Price change */}
      <div className="mb-4 h-5 w-24 rounded-md bg-gray-200" />

      {/* Details button */}
      <div className="h-9 w-full rounded-lg bg-gray-200" />
    </div>
  );
}

function ProductSectionBlock({
  titleWidth = "w-48",
  count = 6,
}: {
  titleWidth?: string;
  count?: number;
}) {
  return (
    <section className="mb-8">
      {/* Section heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-7 w-7 animate-pulse rounded-md bg-gray-200" />
        <div
          className={`h-6 animate-pulse rounded-md bg-gray-200 ${titleWidth}`}
        />
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default function ProductSectionSkeleton() {
  return (
    <div
      className="w-full animate-pulse py-6 sm:py-8"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {/* Prices increased */}
      <ProductSectionBlock titleWidth="w-52" count={3} />

      {/* Prices decreased */}
      <ProductSectionBlock titleWidth="w-48" count={3} />

      {/* All products */}
      <ProductSectionBlock titleWidth="w-40" count={8} />
    </div>
  );
}
