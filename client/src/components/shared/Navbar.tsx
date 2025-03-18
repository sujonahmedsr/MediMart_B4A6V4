"use client"
import { LucideShoppingCart, LucidePackageCheck, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constants";
import { useUser } from "@/userContextApi/UserProvider";
import { useAppSelector } from "@/lib/redux/hooks";
import { orderedProductsSelector } from "@/lib/redux/features/cart/cartSlice";


const Navbar = () => {
    const products = useAppSelector(orderedProductsSelector)
    const { user, setIsLoading } = useUser()
    const locatoin = usePathname()
    const router = useRouter()
    const handleLogOut = () => {
        logout()
        setIsLoading(true)
        if (protectedRoutes.some((route) => locatoin.match(route))) {
            router.push("/");
        }
        router.push("/");
    }
    return (
        <section className="p-4 border-b bg-white sticky top-0 z-10 transition-all">
            <div className="container mx-auto">
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-6">
                        <Link href={'/'} className="text-2xl font-bold flex items-center gap-2">
                            <span>💊</span>
                            <h1>Medi<span className="text-cyan-900">Mart</span></h1>
                        </Link>
                    </div>
                    <SearchBar />
                    <div className="flex items-center gap-5">
                        <Link href={'/shop'}>
                            <Button variant="outline" className=" pointer-events-none rounded duration-300 flex items-center gap-2">
                                <LucidePackageCheck className="size-5" /> Shop Now
                            </Button>
                        </Link>
                        <Link href={'/cart'}>
                            <Button variant="outline" className="relative pointer-events-none rounded duration-300 flex items-center gap-2">
                                <LucideShoppingCart className="size-6" />
                                <div className="absolute -top-2 right-0 text-[10px] w-4 h-4 bg-cyan-600 border text-white text-center rounded-full ">{products?.length}</div>
                            </Button>
                        </Link>
                        {user ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>User</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40 mt-5">
                                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href={'/profile'}>
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        {
                                            user?.role === 'admin' && <Link href={'/admin'}>
                                                <DropdownMenuItem>
                                                    Dashboard
                                                </DropdownMenuItem>
                                            </Link>
                                        }
                                        <DropdownMenuItem>
                                            <Link href={'/My-orders'}>
                                                My Orders
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogOut}
                                        >

                                            <Button className="w-full"> <LogOut /><span>Log Out</span></Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Link href="/login">
                                <Button className="rounded cursor-pointer flex items-center gap-2" variant="outline">
                                    <User className="size-5" /> Login
                                </Button>
                            </Link>
                        )}
                    </div>

                </nav>
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link href={'/'} className="text-xl font-bold flex items-center gap-2">
                                <span>💊</span>
                                <h1>Medi<span className="text-cyan-900">Mart</span></h1>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={'/shop'}>
                                <Button variant="outline" className=" pointer-events-none rounded duration-300 flex items-center gap-1">
                                    <LucidePackageCheck className="size-4" /> Shop
                                </Button>
                            </Link>
                            <Link href={'/cart'}>
                                <Button variant="outline" className="relative pointer-events-none rounded duration-300 flex items-center gap-2">
                                    <LucideShoppingCart className="size-4" />
                                    <div className="absolute -top-2 right-0 text-[10px] w-4 h-4 bg-cyan-600 border text-white text-center rounded-full ">{products?.length}</div>
                                </Button>
                            </Link>
                            {user ? (
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar>
                                                <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                                                <AvatarFallback>User</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-40 mt-5">
                                            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href={'/profile'}>
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            {
                                                user?.role === 'admin' && <Link href={'/admin'}>
                                                    <DropdownMenuItem>
                                                        Dashboard
                                                    </DropdownMenuItem>
                                                </Link>
                                            }
                                            <DropdownMenuItem>
                                                <Link href={'/My-orders'}>
                                                    My Orders
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={handleLogOut}
                                            >

                                                <Button className="w-full"> <LogOut /><span>Log Out</span></Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button className="rounded cursor-pointer flex items-center gap-2" variant="outline">
                                        <User className="size-5" /> Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <SearchBar />
                </div>
            </div>
        </section>
    );
};

export default Navbar;
