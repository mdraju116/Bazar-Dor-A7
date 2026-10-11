
export default function BannerSkeleton() {
  return (
    <section
      className="animate-pulse py-4 sm:py-6"
      aria-label="ব্যানার লোড হচ্ছে"
    >
      <div className="flex min-h-65 flex-col items-center justify-center gap-5 rounded-2xl bg-gray-200 px-6 py-10 sm:min-h-80 sm:flex-row sm:justify-between sm:px-10 lg:min-h-90 lg:px-14">
        {/* Text placeholder */}
        <div className="w-full space-y-4 sm:max-w-[55%]">
          <div className="h-4 w-28 rounded bg-gray-300 sm:w-36" />
          <div className="space-y-2">
            <div className="h-7 w-full max-w-md rounded bg-gray-300 sm:h-9" />
            <div className="h-7 w-4/5 max-w-sm rounded bg-gray-300 sm:h-9" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full max-w-sm rounded bg-gray-300" />
            <div className="h-3 w-4/5 max-w-xs rounded bg-gray-300" />
          </div>
          <div className="h-10 w-36 rounded-lg bg-gray-300" />
        </div>

        {/* Image placeholder */}
        <div className="h-32 w-full max-w-xs rounded-xl bg-gray-300 sm:h-44 sm:w-[40%] lg:h-56" />
      </div>
    </section>
  );
}
