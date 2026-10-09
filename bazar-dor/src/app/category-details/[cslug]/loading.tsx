
export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
      {/* Category header skeleton */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fafcfa] p-5">
        <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
        </div>
      </div>

      {/* Sort skeleton */}
      <div className="mt-6 flex justify-between gap-4">
        <div className="h-5 w-40 rounded bg-gray-200" />
        <div className="h-10 w-48 rounded-lg bg-gray-200" />
      </div>

      {/* Product card skeletons */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-5 w-28 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>

            <div className="mt-5 h-24 rounded-xl bg-gray-100" />
            <div className="mt-4 h-11 rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}

