
import { ProductType } from "@/app/types/ProductType";

interface PriceCardProps {
  product: ProductType;
}

const formatBengaliNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const PriceCard = ({ product }: PriceCardProps) => {
  const { markets } = product;

  const allPrices = markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minPrice =
    allPrices.length > 0 ? Math.min(...allPrices) : 0;

  const maxPrice =
    allPrices.length > 0 ? Math.max(...allPrices) : 0;

  const averagePrice =
    allPrices.length > 0
      ? allPrices.reduce((sum, price) => sum + price, 0) /
        allPrices.length
      : 0;



  const cards = [
    {
      title: "সর্বনিম্ন দাম",
      price: minPrice,
      description: "সবচেয়ে কম দামের বাজার",
      color: "text-green-600",
     
    },
    {
      title: "সর্বোচ্চ দাম",
      price: maxPrice,
      description: "সবচেয়ে বেশি দামের বাজার" ,
      color: "text-red-600",
     
    },
    {
      title: "গড় দাম",
      price: averagePrice,
      description: "প্রতি কেজি এর হিসাবে",
      color: "text-green-600",
      
    },
  ];

  return (
    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-100 bg-white px-6 py-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              {card.title}
            </h3>
          </div>

          <p className={`mt-1 text-2xl font-bold ${card.color}`}>
            {formatBengaliNumber(card.price)}
            <span className="ml-1 text-sm font-medium">টাকা</span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {card.description}
          </p>

        </div>
      ))}
    </div>
  );
};

export default PriceCard;

