import Image from "next/image";
import logo from "../../../../assets/logo-icon.png"
import UserInfo from "./UserInfo";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })

    return (
        <div className="flex justify-between  container mx-auto px-24 ">

            {/* left side */}
            <div className="flex gap-2 justify-center ">
                <div className="bg-[#2dc06d] w-10 h-10 flex items-center justify-center rounded-xl">
                    <Image src={logo} alt="nav-logo"
                        width={20}
                        height={20}
                        className="object-contain">
                    </Image>

                </div>

                <div className="flex flex-col">
                    <h1 className="font-bold ">বাজার দর </h1>
                    <p className="text-xs font-semibold"> {date}</p>

                </div>

            </div>


            {/* Right side */}
            <div>
                <UserInfo></UserInfo>
            </div>

        </div>
    );
};

export default Header;