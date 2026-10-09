
import { ProductType } from "@/app/types/ProductType";

interface SingleProductProps {
    product: ProductType;
}

const formatBengaliNumber = (value: number) =>
    new Intl.NumberFormat("bn-BD", {
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

const SingleProductCard = ({ product }: SingleProductProps) => {
    const { image, nameBn, categoryNameBn, categoryIcon, unit, today, yesterday, change, } = product;

    const difference = today - yesterday;

    const changeText =
        difference > 0
            ? `গতকালের তুলনায় আজ দাম বেড়েছে - ${formatBengaliNumber(difference)} টাকা `
            : difference < 0
                ? `গতকালের তুলনায় আজ দাম কমেছে - ${formatBengaliNumber(Math.abs(difference))} টাকা `
                : "গতকালের তুলনায় আজ দাম - অপরিবর্তিত";

    return (
        <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">


            {/* Product information */}
            <div className="flex min-w-0 items-stretch gap-4">
                <div className="flex w-20 shrink-0 items-center justify-center self-stretch rounded-xl bg-green-50 text-3xl">
                    {categoryIcon || image || "🛒"}
                </div>

                <div className="min-w-0">
                    <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        {nameBn}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {formatUnit(unit)} - {categoryNameBn}
                    </p>

                    <p
                        className={`mt-3 text-sm font-medium ${difference > 0
                            ? "text-red-600"
                            : difference < 0
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                    >
                        {changeText}
                    </p>
                </div>
            </div>



            {/* Today's price */}
            <div className="shrink-0 rounded-xl border border-green-100 bg-green-50/70  py-2 sm:min-w-36 sm:text-center">
                <p className="text-sm text-gray-600">আজকের দাম</p>

                <p className="mt-1 text-2xl font-bold ">
                    {formatBengaliNumber(today)}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    <span className="text-sm font-medium">টাকা</span> /{" "}
                    {unit === "kg"
                        ? "কেজি"
                        : unit === "litre" || unit === "liter"
                            ? "লিটার"
                            : unit === "piece"
                                ? "পিস"
                                : unit === "dozen"
                                    ? "ডজন"
                                    : unit === "packet"
                                        ? "প্যাকেট"
                                        : unit}
                </p>

                <p
                    className={`mt-2 flex items-center justify-center gap-1 text-xs font-semibold ${change.dir === "up"
                            ? "text-red-600"
                            : change.dir === "down"
                                ? "text-green-600"
                                : "text-gray-500"
                        }`}
                >
                    {change.dir === "up" ? (
                        <>
                            <span>▲</span>
                            <span>{formatBengaliNumber(change.pct)}%</span>
                        </>
                    ) : change.dir === "down" ? (
                        <>
                            <span>▼</span>
                            <span>{formatBengaliNumber(change.pct)}%</span>
                        </>
                    ) : (
                        <span>— ০.০%</span>
                    )}
                </p>
            </div>
           

        </div>
    );
};

export default SingleProductCard;

