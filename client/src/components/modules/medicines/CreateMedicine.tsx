"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allCategories } from "@/services/Category";
import { useEffect, useState } from "react";
import { ICategory } from "@/types/category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/ImagePreviewer";

// Zod Schema
type ProductFormType = z.infer<typeof productSchema>;

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    image: z.string().optional(),
    price: z.string().min(1, "Price cannot be negative"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    quantity: z.string().min(1, "Quantity cannot be negative"),
    expireDate: z.string().min(1, "Expire Date is required"),
    manufacturerDetails: z.string().min(5, "Manufacturer details are required"),
    requiredPrescription: z.boolean(),
});

export default function CreateMedicine() {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const [categories, setCategories] = useState<ICategory[] | []>([])
    useEffect(() => {
        const fetchData = async () => {
            const category = await allCategories()
            setCategories(category?.data)
        }
        fetchData()
    }, [])

    console.log(imageFiles);
    

    const form = useForm<ProductFormType>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            image: "",
            price: "",
            category: "",
            description: "",
            quantity: "",
            expireDate: "",
            manufacturerDetails: "",
            requiredPrescription: false,
        },
    });

    const onSubmit = (data: ProductFormType) => {
        console.log("Product Data:", data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-2xl w-full mx-auto p-6 border rounded-lg"
            >
                <div className="flex md:flex-row flex-col items-center justify-between gap-10">
                    <div className="w-full">
                        <div className="mb-5">
                            <Button variant={"outline"} className="text-xl font-semibold bg-blue-200 rounded-none pointer-events-none">Add Medicine</Button>
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        {imagePreview?.length > 0 ? (
                            <ImagePreviewer
                                setImageFiles={setImageFiles}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />
                        ) : (
                            <NMImageUploader
                                setImageFiles={setImageFiles}
                                setImagePreview={setImagePreview}
                            />
                        )}
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center justify-between gap-5">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/2">
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Product Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category?._id} value={category?._id}>
                                                {category?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/2">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="Enter Price" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Medicine Description"
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex md:flex-row flex-col items-center justify-between gap-5">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/2">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter quantity" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="expireDate"
                        render={({ field }) => (
                            <FormItem className="w-full md:w-1/2">
                                <FormLabel>Expire Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="manufacturerDetails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manufacturer Details</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Manufacturer Details"
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="rounded-none" type="submit">Submit Product</Button>
            </form>
        </Form>
    );
}
