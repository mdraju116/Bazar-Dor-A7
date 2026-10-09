
import Banner from "./components/homepage/Banner";
// import DecreasedPrice from "./components/homepage/DecreasedPrice";
// import IncreasedPrice from "./components/homepage/IncreasedPrice";
// import AllProducts from "./components/homepage/AllProducts";
import ProductSectoin from "./components/homepage/ProductSectoin";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      {/* Wrap Banner in Suspense to satisfy Next.js prerendering rules */}
      <Suspense fallback={<div className="h-10 bg-gray-50 text-center" >Loading data... </div>} >
        <Banner />
      </Suspense>

      <Suspense fallback={<div className="h-10 bg-gray-50 text-center" >Loading data... </div>} >
        <ProductSectoin />
      </Suspense>


      {/* <IncreasedPrice/>
        <DecreasedPrice/>
        <AllProducts/> */}

    </div>
  );
}
