
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

import Link from "next/link";

export interface ProductType {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
}

// English number → Bangla number
const toBanglaNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return value
        .toString()
        .replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

// English unit → Bangla unit
const getBanglaUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        kilogram: "কেজি",
        litre: "লিটার",
        liter: "লিটার",
        l: "লিটার",
        piece: "পিস",
        pcs: "পিস",
        dozen: "ডজন",
        packet: "প্যাকেট",
        pack: "প্যাকেট",
        bundle: "আঁটি",
    };

    return units[unit.toLowerCase()] || unit;
};


const Marquee = async () => {
    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const products: ProductType[] = await response.json();

    return (
        <div className="overflow-hidden border-y border-gray-200 bg-green-50 p-1">
            <MarqueeText direction="right" duration={10}>
                {products.map((product) => {
                    const banglaPrice = toBanglaNumber(product.today);
                    const banglaUnit = getBanglaUnit(product.unit);
                    const banglaPercent = toBanglaNumber(
                        Math.abs(product.change.pct)
                    );

                    let changeText = "— ০.০%";
                    let changeColor = "text-gray-500";

                    if (product.change.dir === "up") {
                        changeText = `▲ ${banglaPercent}%`;
                        changeColor = "text-green-600";
                    } else if (product.change.dir === "down") {
                        changeText = `▼ ${banglaPercent}%`;
                        changeColor = "text-red-600";
                    }

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="mx-6 inline-flex items-center gap-2 whitespace-nowrap"
                        >
                            <span className="text-lg">
                                {product.categoryIcon}
                            </span>

                            <span className="font-semibold text-gray-900">
                                {product.nameBn}
                            </span>

                            <span className="text-gray-700">
                                {banglaPrice} টাকা/{banglaUnit}
                            </span>

                            <span className={`font-semibold ${changeColor}`}>
                                {changeText}
                            </span>

                            <span className="text-gray-300">|</span>
                        </Link>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;
