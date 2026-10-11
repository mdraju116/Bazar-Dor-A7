
export default function ProductDetailsLoading() {
  return (
    <main
      className="mt-5 w-full animate-pulse pb-10"
      aria-label="পণ্যের বিস্তারিত লোড হচ্ছে"
      aria-busy="true"
    >
      {/* Breadcrumb skeleton */}
      <nav className="mb-6 flex flex-wrap items-center gap-2">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-3 w-3 rounded bg-gray-100" />
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-3 w-3 rounded bg-gray-100" />
        <div className="h-4 w-28 rounded bg-gray-200" />
      </nav>

      {/* Product summary skeleton */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Product image / emoji placeholder */}
          <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-xl bg-gray-100 sm:h-40 sm:w-40">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
          </div>

          {/* Product information */}
          <div className="min-w-0 flex-1 space-y-4">
            <div className="h-7 w-3/4 max-w-sm rounded bg-gray-200" />
            <div className="h-4 w-full max-w-md rounded bg-gray-100" />

            <div className="flex flex-wrap gap-2">
              <div className="h-7 w-20 rounded-full bg-gray-200" />
              <div className="h-7 w-24 rounded-full bg-gray-200" />
              <div className="h-7 w-16 rounded-full bg-gray-100" />
            </div>

            <div className="h-8 w-40 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-100" />
          </div>
        </div>
      </section>

      {/* Price summary and market prices */}
      <section className="mt-6 rounded-2xl bg-[#fafcfa] p-4 sm:p-6">
        <div className="mb-5 h-6 w-44 rounded bg-gray-200" />

        {/* Price cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="mb-4 h-4 w-28 rounded bg-gray-200" />
              <div className="mb-3 h-8 w-36 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Market-wise price heading */}
        <div className="mb-5 mt-8 h-6 w-56 max-w-full rounded bg-gray-200" />

        {/* Market table skeleton */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Table header */}
          <div className="grid grid-cols-2 gap-3 bg-gray-100 p-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-4 rounded bg-gray-200 ${
                  index > 1 ? "hidden sm:block" : ""
                }`}
              />
            ))}
          </div>

          {/* Table rows */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 border-t border-gray-100 p-4 sm:grid-cols-4"
            >
              <div className="h-4 w-4/5 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-100" />
              <div className="hidden h-4 w-2/3 rounded bg-gray-100 sm:block" />
              <div className="hidden h-4 w-2/3 rounded bg-gray-200 sm:block" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
