
import { ProductType } from "@/app/types/ProductType";

interface BazarCardProps {
  product: ProductType;
}

const formatBengaliNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const BazarCard = ({ product }: BazarCardProps) => {
  const { markets, unit } = product;

  const formatUnit = (value: string) => {
    const unitMap: Record<string, string> = {
      kg: "কেজি",
      litre: "লিটার",
      liter: "লিটার",
      piece: "পিস",
      dozen: "ডজন",
      packet: "প্যাকেট",
    };

    return unitMap[value.toLowerCase()] || value;
  };

  return (
    <div className="my-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        
        <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          {markets.length.toLocaleString("bn-BD")} টি বাজার
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-162.5 border-collapse text-center text-sm">
          <thead className="bg-green-50 text-gray-700">
            <tr>
              <th className="border-b border-gray-200 p-4">
                ক্রমিক
              </th>

              <th className="border-b border-gray-200 p-4 text-left">
                 বিভাগ
              </th>

              <th className="border-b border-gray-200 p-4 text-left">
                বাজারের নাম
              </th>

              <th className="border-b border-gray-200 p-4">
                সর্বনিম্ন
              </th>

              <th className="border-b border-gray-200 p-4">
                সর্বোচ্চ
              </th>

              <th className="border-b border-gray-200 p-4">
                গড় দাম
              </th>
            </tr>
          </thead>

          <tbody>
            {markets.length > 0 ? (
              markets.map((item, index) => {
                const average = (item.min + item.max) / 2;

                return (
                  <tr
                    key={`${item.market}-${item.division}-${index}`}
                    className="transition-colors odd:bg-white even:bg-gray-50 hover:bg-green-50"
                  >
                    <td className="border-b border-gray-100 p-4 text-gray-500">
                      {formatBengaliNumber(index + 1)}
                    </td>

                    <td className="border-b border-gray-100 p-4 text-left">
                      <span className="inline-block   px-3 py-1 text-xs font-semibold ">
                        {item.division}
                      </span>
                    </td>

                    <td className="border-b border-gray-100 p-4 text-left font-medium text-gray-800">
                      {item.market}
                    </td>

                    <td className="border-b border-gray-100 p-4 font-semibold text-green-700">
                      {formatBengaliNumber(item.min)}
                      <span className="ml-1 text-xs font-normal">
                        টাকা
                      </span>
                    </td>

                    <td className="border-b border-gray-100 p-4 font-semibold text-red-600">
                      {formatBengaliNumber(item.max)}
                      <span className="ml-1 text-xs font-normal">
                        টাকা
                      </span>
                    </td>

                    <td className="border-b border-gray-100 p-4 font-semibold text-gray-800">
                      {formatBengaliNumber(average)}
                      <span className="ml-1 text-xs font-normal">
                        টাকা
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  এই পণ্যের কোনো বাজারের তথ্য পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        * সব দাম {formatUnit(unit)} অনুযায়ী দেখানো হয়েছে।
      </p>
    </div>
  );
};

export default BazarCard;

