
export default function ProfileInfoLoading() {
  return (
    <main
      className="mx-auto min-h-[60vh] w-full max-w-2xl animate-pulse px-4 py-8 sm:py-12"
      aria-label="প্রোফাইল লোড হচ্ছে"
      aria-busy="true"
    >
      {/* Page heading */}
      <div className="mb-6 space-y-3">
        <div className="h-7 w-40 rounded-md bg-gray-200 sm:h-8" />
        <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
      </div>

      {/* User information card */}
      <section className="flex flex-col gap-5 rounded-2xl border border-green-100 bg-[#fafcfa] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          {/* Profile image */}
          <div className="h-16 w-16 shrink-0 rounded-full bg-gray-200 sm:h-20 sm:w-20" />

          {/* Name and email */}
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-5 w-36 max-w-full rounded bg-gray-200" />
            <div className="h-4 w-48 max-w-full rounded bg-gray-100" />
          </div>
        </div>

        {/* Sign-out button */}
        <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-28" />
      </section>

      {/* Update section heading */}
      <div className="mb-4 mt-10 space-y-3">
        <div className="h-6 w-32 rounded-md bg-gray-200" />
        <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
      </div>

      {/* Update profile form */}
      <section className="rounded-2xl border border-green-100 bg-[#fafcfa] p-5 sm:p-6">
        <div className="mx-auto flex w-full max-w-md flex-col gap-5">
          {/* Name label and input */}
          <div className="space-y-2">
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-lg border border-gray-200 bg-white" />
          </div>

          {/* Update button */}
          <div className="h-11 w-full rounded-lg bg-gray-200" />
        </div>
      </section>
    </main>
  );
}
