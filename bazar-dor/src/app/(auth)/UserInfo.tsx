import Link from "next/link";

const UserInfo = () => {
    return (
        <div className="flex gap-2">

            <Link href={"/sign-up"} className="btn bg-[#068a3f] text-white p-2 rounded-xl font-semibold"> সাইন আপ  </Link>
           <Link href={"/sign-in"} className="btn  bg-[#068a3f] text-white p-2 rounded-xl font-semibold"> সাইন ইন </Link>
           
        </div>
    );
};

export default UserInfo;