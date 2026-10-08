
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
import { ProductType } from "../../types/ProductType";


// API unit → English to Bangla 
const getBanglaUnit = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    return units[unit.toLowerCase()] || unit;
};

// English number → Bangla number
const toBanglaNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";
    return String(value).replace( /\d/g, (digit) => banglaDigits[Number(digit)] );
};




const Marquee = async () => {
    const response = await fetch( "https://api.api-store.workers.dev/api/bazardor/products");
    const products: ProductType[] = await response.json();

    return (
        <div className="overflow-hidden border-y border-gray-200 bg-green-50 p-1">
            <MarqueeText direction="right" duration={10}>

                {products.map((product) => {
                    const price = toBanglaNumber(product.today);
                    const unit = getBanglaUnit(product.unit);

                    let change = "— ০.০%";
                    let changeColor = "text-gray-500";

                    if (product.change.dir === "up") {
                        change = `▲ ${toBanglaNumber(product.change.pct)}%`;
                        changeColor = "text-green-600";
                    }

                    if (product.change.dir === "down") {
                        change = `▼ ${toBanglaNumber(Math.abs(product.change.pct))}%`;
                        changeColor = "text-red-600";
                    }

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="mx-6 inline-flex items-center gap-2 whitespace-nowrap"
                        >
                            {/* Icon */}
                            <span className="text-lg"> {product.categoryIcon} </span>

                            {/* Product name */}
                            <span className="font-semibold text-gray-900"> {product.nameBn}  </span>

                            {/* Price */}
                            <span className="text-gray-900"> {price} টাকা/{unit}  </span>

                            {/* Change */}
                            <span className={`font-semibold ${changeColor}`} >
                                {change}
                            </span>

                            {/* Separator */}
                            <span className="text-gray-300">|</span>
                        </Link>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;
