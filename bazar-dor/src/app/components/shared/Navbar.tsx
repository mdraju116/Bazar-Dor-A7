import { Suspense } from "react";
import Header from "./Header";
import NavCategory from "./NavCategories";




const Categories = async () => {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
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
            <Header />

            <Suspense fallback={"loading..."}>
                <Categories />
            </Suspense>
        </div>
    );
};

export default Navbar;