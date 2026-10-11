
type NavbarSkeletonProps = {
  variant: "header" | "categories" | "marquee";
};

export default function NavbarSkeleton({
  variant,
}: NavbarSkeletonProps) {
  if (variant === "header") {
    return (
      <div
        className="flex h-16 animate-pulse items-center justify-between gap-4 rounded-xl bg-white px-4 sm:px-6"
        aria-label="হেডার লোড হচ্ছে"
      >
        <div className="space-y-2">
          <div className="h-5 w-28 rounded bg-gray-200 sm:w-36" />
          <div className="h-3 w-36 rounded bg-gray-100 sm:w-48" />
        </div>

        <div className="hidden gap-2 sm:flex">
          <div className="h-9 w-20 rounded-lg bg-gray-200" />
          <div className="h-9 w-20 rounded-lg bg-gray-200" />
        </div>

        <div className="h-9 w-9 rounded-lg bg-gray-200 sm:hidden" />
      </div>
    );
  }

  if (variant === "categories") {
    return (
      <div
        className="flex min-h-12 animate-pulse items-center gap-3 overflow-hidden rounded-lg px-2 py-3 sm:gap-5 sm:px-4"
        aria-label="ক্যাটাগরি লোড হচ্ছে"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`h-7 shrink-0 rounded-md bg-gray-200 ${
              index % 2 === 0 ? "w-16" : "w-20"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="mt-2 flex h-10 animate-pulse items-center gap-3 overflow-hidden rounded-lg bg-white px-4"
      aria-label="দামের তথ্য লোড হচ্ছে"
    >
      <div className="h-4 w-6 shrink-0 rounded bg-gray-200" />
      <div className="h-4 w-28 shrink-0 rounded bg-gray-200" />
      <div className="h-4 w-20 shrink-0 rounded bg-gray-100" />
      <div className="h-4 w-12 shrink-0 rounded bg-gray-200" />
      <div className="h-4 w-24 shrink-0 rounded bg-gray-100" />
    </div>
  );
}
