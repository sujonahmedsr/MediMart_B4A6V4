/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage, FormControl } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getCurrentUser, updateProfile } from "@/services/AuthService";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateCity, updateShippingAddress } from "@/lib/redux/features/cart/cartSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cities } from "@/constants/cities";
import { IUser } from "@/types/user";
import Loading from "@/app/loading";

// Zod schema for validation
const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    password: z.string().optional(),
    image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const DeliveryDetails = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Set initial loading state
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getCurrentUser();

            setUser(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);



    // Initialize form with default values
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            city: user?.city || "",
            address: user?.address || "",
            image: user?.image || "",
        },
    });

    const { reset, setValue } = form;

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                city: user?.city || "",
                address: user?.address || "",
                image: user?.image || "",
            });
            if (user.city) {
                setValue("city", user.city);
                dispatch(updateCity(user.city));
            }
        }
    }, [user, reset, setValue, dispatch]);

    if (isLoading) {
        return <Loading />; // Ensure the page stops rendering until the user data is loaded
    }

    const handleCitySelect = (city: string) => {
        setValue("city", city);
        dispatch(updateCity(city));
    };

    const handleShippingAddress = (address: string) => {
        dispatch(updateShippingAddress(address));
    };

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const res = await updateProfile({ ...data });

            if (res?.status) {
                toast.success(res.message);
                setIsEditingProfile(false);
                window.location.reload()
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Something went wrong please try again.");
        }
    };

    const handleCancelProfileEdit = () => {
        setIsEditingProfile(false);
    };

    return (
        <div className="border rounded h-full p-10 space-y-5">
            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center justify-between gap-5">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>Name</Label>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} disabled={!isEditingProfile} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email (Read-Only) */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>Email</Label>
                                    <FormControl>
                                        <Input placeholder="Your email" {...field} value={field.value || ""} disabled={true} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-5">
                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>Phone</Label>
                                    <FormControl>
                                        <Input placeholder="Enter your phone number" {...field} value={field.value || ""} disabled={!isEditingProfile} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* City */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>City</Label>
                                    <FormControl>
                                        <Select disabled={!isEditingProfile} onValueChange={handleCitySelect} defaultValue={user?.city || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-5">
                        {/* Address Form Field */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>Address</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your address Like. Home No. Road. Village. Thana. Zila"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                field.onChange(e.target.value); // Update form state
                                                handleShippingAddress(e.target.value); // Update Redux state
                                            }}
                                            disabled={!isEditingProfile}
                                            rows={5}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {isEditingProfile ? (
                            <div className="flex gap-4 mt-4">
                                <Button variant="outline" className="rounded">Save Changes</Button>
                                <Button variant="destructive" className="rounded" onClick={handleCancelProfileEdit}>Cancel</Button>
                            </div>
                        ) : (
                            <Button className="mt-4 rounded" variant="outline" onClick={() => setIsEditingProfile(true)}>Edit Address</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default DeliveryDetails;
