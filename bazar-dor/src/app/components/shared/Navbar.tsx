import Link from "next/link";
import Header from "./Header";

export interface CategoryType{
    id:string,
    slug:string,
    nameBn:string,
    icon:string
}

const Navbar = async() => {

    const response =await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const categories:CategoryType[] = await response.json();
    // console.log(categories);

    return (
        <div className="mt-5 mb-1 ">
            <Header></Header>
            
            {/* Navlinks */}
            <div className="flex  border border-gray-100 bg-[#ecf8ec] mt-2 p-2 gap-6 shadow-sm  px-38">
                {
                    categories.map((category)=>(
                        <div key={category.id} className="font-bold">
                            <Link href={"/categor"} >{category.icon} {category.nameBn}</Link>
                            
                        </div>
                        
                    ))
                }
                
            </div>


        </div>
    );
};

export default Navbar;