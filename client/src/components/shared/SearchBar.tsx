"use client"
import { allProducts } from "@/services/medicine";
import { LucideSearch } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { IMedicine } from "@/types/medicine";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SearchBar = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const productData = await allProducts(undefined, "100", undefined);
            setProducts(productData?.data?.result);
            setFilteredProducts(productData?.data?.result);
            setLoading(false);
        };
        fetchData();

        // Close dropdown when clicking outside of the component
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false); // Close dropdown
            }
        };

        // Add event listener for clicks outside
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMedicine = (id: string) => {
        router.push(`/shop/${id}`);
    };

    const handleBarClick = () => {
        setOpen(!open); // Toggle dropdown visibility on input click
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchTerm(query);

        // Filter products based on the search query
        const filtered = products.filter((product: IMedicine) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
        setOpen(true); // Keep dropdown open when typing
    };

    return (
        <div className="flex items-center lg:w-1/3 w-full lg:mt-0 mt-2 relative">
            <input
                type="text"
                value={searchTerm} // Controlled input with searchTerm state
                onClick={handleBarClick}
                onChange={handleSearchChange} // Handle input change for search filtering
                placeholder="Search products..."
                className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition-all duration-300"
            />
            <LucideSearch className="absolute left-3 text-gray-500 text-lg" />
            <div
                ref={dropdownRef} // Attach the ref to the dropdown container
                className={`absolute ${open ? "" : "hidden"} w-full top-12 h-[60vh] overflow-scroll overflow-x-hidden bg-white border p-2`}
            >
                <div className="flex flex-col gap-2">
                    {loading ? (
                        <div className="grid place-items-center h-[50vh]">
                            <h1 className="text-lg font-semibold text-cyan-900">
                                Loading Please wait...
                            </h1>
                        </div>
                    ) : (
                        filteredProducts?.map((item: IMedicine, index: number) => (
                            <div
                                key={index + 1}
                                onClick={() => handleMedicine(item?._id)}
                                className="cursor-pointer"
                            >
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <Image
                                            src={item?.image as string}
                                            alt={item?.name}
                                            width={100}
                                            height={100}
                                            className="w-10 h-10"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="text-base font-semibold">
                                                {item?.name}
                                            </h1>
                                            <p className="text-sm text-gray-600">
                                                {item?.category?.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Price: ৳{item?.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="text-center">
                    <Link href={'/shop'}>
                        <Button variant={"outline"} className="mt-5">
                            View All Medicine
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
