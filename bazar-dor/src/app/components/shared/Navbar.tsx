import { Suspense } from "react";
import Header from "./Header";
import NavCategory from "./NavCategories";
import Marquee from "./Marquee";
import NavbarSkeleton from "./NavbarSkeleton";



const Categories = async () => {
  let categories = [];

  try {
    const response = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      { next: { revalidate: 3600 } }
    );

    if (response.ok) {
      categories = await response.json();
    }

  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return <NavCategory categories={categories} />;
};


const Navbar = () => {
  return (
    <div className=" mt-4 w-full   ">

      {/* Wraping Header in Suspense to satisfy Next.js prerendering rules, otherwise new Date() is creating error */}
      
        <Suspense fallback={<NavbarSkeleton variant="header" />}>
          <Header />
        </Suspense>


      <Suspense fallback={<NavbarSkeleton variant="categories" />}>
        <Categories />
      </Suspense>

      {/* Marquee wrapped in Suspense to handle the async fetch */}
      <Suspense fallback={<NavbarSkeleton variant="marquee" />}>
        <Marquee />
      </Suspense>
    </div>
  );
};

export default Navbar;