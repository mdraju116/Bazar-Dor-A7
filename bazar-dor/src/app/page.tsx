
import { Suspense } from "react";

import Banner from "./components/homepage/Banner";
import ProductSectoin from "./components/homepage/ProductSectoin";

import BannerSkeleton from "./components/homepage/BannerSkeleton";
import ProductSectionSkeleton from "./components/shared/ProductSectionSkeleton";

export default function Home() {
  return (
    <div>
      {/* Wrap Banner in Suspense to satisfy Next.js prerendering rules */}
      {/* Banner loading skeleton */}
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>

      {/* Product sections loading skeleton */}
      <Suspense fallback={<ProductSectionSkeleton />}>
        <ProductSectoin />
      </Suspense>
    </div>
  );
}
