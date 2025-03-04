"use client"
import { LucideShoppingCart, Menu, LucidePackageCheck, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

const navItems = [
    {
        title: 'Home',
        link: '/'
    },
    {
        title: 'All Products',
        link: '/products'
    },
    {
        title: 'About Us',
        link: '/about'
    },
    {
        title: 'Contact Us',
        link: '/contact'
    },
]

const Navbar = () => {
    const locatoin = usePathname()
    return (
        <section className="p-4 border-b bg-white sticky top-0 z-10 transition-all">
            <div className="container mx-auto">
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-6">
                        <Link href={'/'} className="text-2xl font-bold flex items-center gap-2">
                            <LucidePackageCheck className="text-blue-600" />
                            <h1>Medi<span className="text-blue-600">Mart</span></h1>
                        </Link>
                    </div>
                    <SearchBar />
                    <div className="flex items-center gap-5">
                        <Link href={'/track-order'}>
                            <Button variant="outline" className="text-blue-700 pointer-events-none rounded duration-300 flex items-center gap-2">
                                <LucidePackageCheck className="size-5" /> Track Order
                            </Button>
                        </Link>
                        <Link href={'/cart'}>
                            <div className="relative">
                                <LucideShoppingCart className="size-6" />
                                <div className="absolute -top-3 -right-2 text-blue-700">0</div>
                            </div>
                        </Link>
                        <Link href={'/login'}>
                            <Button variant="outline" className="text-blue-700 pointer-events-none rounded duration-300 flex items-center gap-2">
                                <User className="size-5" /> Sign In
                            </Button>
                        </Link>
                    </div>

                </nav>
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href={'/'} className="text-lg font-bold flex items-center gap-2">
                            <LucidePackageCheck className="text-blue-600" />
                            <h1>Medi<span className="text-blue-600">Mart</span></h1>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link href={'/cart'}>
                                <div className="relative">
                                    <LucideShoppingCart className="text-lg" />
                                    <div className="absolute -top-3 -right-2 text-blue-700">0</div>
                                </div>
                            </Link>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href={'/'} className="text-xl font-bold flex items-center gap-2">
                                                <LucidePackageCheck className="text-blue-600" />
                                                <h1>Medi<span className="text-blue-600">Mart</span></h1>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="mb-6 mt-6 flex flex-col gap-4">
                                        {navItems.map((item, index) => (
                                            <Link
                                                key={index + 1}
                                                className={cn(
                                                    "text-muted-foreground",
                                                    navigationMenuTriggerStyle,
                                                    buttonVariants({
                                                        variant: "ghost",
                                                    }),
                                                    `hover:text-blue-600 ${locatoin === item?.link ? "text-blue-600" : ""}`
                                                )}
                                                href={item?.link}
                                            >
                                                {item?.title}
                                            </Link>
                                        ))}
                                        <Link href={'/track-order'} className={cn("text-muted-foreground", buttonVariants({ variant: "ghost" }))}>
                                            Track Order
                                        </Link>
                                        <Link href={'/login'} className={cn("text-muted-foreground", buttonVariants({ variant: "ghost" }))}>
                                            Sign In
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <SearchBar />
                </div>
            </div>
        </section>
    );
};

export default Navbar;
