
import Link from "next/link";
import { ProductType } from "@/app/types/ProductType";

interface ProductCardProps {
  product: ProductType;
}

const formatBengaliNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value);

const formatUnit = (unit: string) => {
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    packet: "প্রতি প্যাকেট",
  };

  return unitMap[unit.toLowerCase()] || unit;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, image, nameBn, unit, today, change } = product;

  const isUp = change.dir === "up";
  const isDown = change.dir === "down";

  const changeColor = isUp
    ? "bg-green-50 text-green-700"
    : isDown
      ? "bg-red-50 text-red-700"
      : "bg-gray-100 text-gray-500";

  const changeSymbol = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/products-details/${id}`}
      className="group block h-full rounded-2xl border border-gray-100 bg-[#fafcfa] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
    >
      <div className="flex h-full flex-col justify-between gap-5">
        {/* Product information */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#068a3f]/5 text-3xl">
            {image || "🛒"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-gray-800 transition-colors group-hover:text-green-700 sm:text-lg">
              {nameBn}
            </h3>

            <p className="mt-1 text-sm font-medium">
              {formatUnit(unit)}
            </p>
          </div>
        </div>

        {/* Today's price */}
        <div className="border-t border-gray-100 pt-4">
          <p className="mb-2 text-sm font-medium">
            আজকের দাম
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xl font-bold text-gray-900">
              {formatBengaliNumber(Number(today))}
              <span className="ml-1 text-sm font-medium">
                টাকা
              </span>
            </p>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${changeColor}`}
            >
              {changeSymbol}{" "}
              {formatBengaliNumber(
                change.dir === "flat" ? 0 : Math.abs(change.pct)
              )}
              %
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

