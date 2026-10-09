import { Suspense } from "react";
import Header from "./Header";
import NavCategory from "./NavCategories";
import Marquee from "./Marquee";



const Categories = async () => {
    const response = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(`Categories API error: ${response.status}`);
    }


    const categories = await response.json();

    return <NavCategory categories={categories} />;
};

const Navbar = () => {
    return (
        <div className="mt-4">

            {/* Wraping Header in Suspense to satisfy Next.js prerendering rules,
            otherwise new Date() is creating error */}
            <Suspense fallback={ <div className="h-10 bg-gray-50 text-center" >Loading data... </div>} >
                <Header />
            </Suspense>

            <Suspense fallback={ <div className="h-10 bg-gray-50 text-center" >Loading data... </div>} >
                <Categories />
            </Suspense>


            {/* Marquee wrapped in Suspense to handle the async fetch */}
            <Suspense fallback={ <div className="h-10 bg-gray-50 text-center" >Loading data... </div>} >
                <Marquee />
            </Suspense>

        </div>
    );
};

export default Navbar;