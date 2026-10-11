
import { FaShoppingBasket } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <main
      className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-12"
      role="status"
      aria-label="পেজ লোড হচ্ছে"
    >
      {/* Brand icon */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50">
        <FaShoppingBasket className="text-4xl text-[#068a3f]" />

        {/* Spinner ring */}
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#068a3f]" />
      </div>

      {/* Brand name */}
      <h2 className="text-2xl font-extrabold text-gray-800">
        বাজার <span className="text-[#068a3f]">দর</span>
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        আপনার বাজারের তথ্য প্রস্তুত হচ্ছে...
      </p>

      {/* Loading dots */}
      <div className="mt-5 flex items-center gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#068a3f]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#068a3f] [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#068a3f] [animation-delay:300ms]" />
      </div>

      {/* Content skeleton */}
      <div className="mt-10 w-full max-w-5xl space-y-6">
        {/* Banner placeholder */}
        <div className="h-36 animate-pulse rounded-2xl bg-gray-100 sm:h-48" />

        {/* Product card placeholders */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-100" />
                  <div className="h-3 w-1/2 rounded bg-gray-50" />
                </div>
              </div>

              <div className="mb-3 h-6 w-2/3 rounded bg-gray-100" />
              <div className="h-9 w-full rounded-lg bg-gray-50" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">লোড হচ্ছে...</span>
    </main>
  );
};

export default LoadingPage;
