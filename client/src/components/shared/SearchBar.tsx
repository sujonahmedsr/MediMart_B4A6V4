import { LucideSearch } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex items-center lg:w-1/3 w-full lg:mt-0 mt-2 relative">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition-all duration-300"
            />
            <LucideSearch className="absolute left-3 text-gray-500 text-lg" />
        </div>
    );
};

export default SearchBar;