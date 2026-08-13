
import { GiCash } from "react-icons/gi";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";

const ReturnPolicy = () => {
    return (
      <div className="mt-0 w-full px-0 py-2.5 sm:px-6 lg:px-3">
    <div className="flex items-center justify-around rounded-lg border border-pink-300 bg-pink-100 px-0 py-1 shadow-sm sm:px-6 sm:py-5">
        <div className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:gap-3">
            <MdOutlineAssignmentReturn className="text-2xl text-pink-600 sm:text-3xl" />
            <p className="mb-0 text-xs font-semibold text-slate-700 sm:text-sm">
                7 Days Easy Return
            </p>
        </div>
        <div className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:gap-3">
            <GiCash className="text-2xl text-pink-600 sm:text-3xl" />
            <p className="mb-0 text-xs font-semibold text-slate-700 sm:text-sm">
                Cash on Delivery
            </p>
        </div>
        <div className="flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:gap-3">
            <RiPriceTag3Line className="text-2xl text-pink-600 sm:text-3xl" />
            <p className="mb-0 text-xs font-semibold text-slate-700 sm:text-sm">
                Lowest Prices
            </p>
        </div>
    </div>
</div>
    );
};

export default ReturnPolicy;
