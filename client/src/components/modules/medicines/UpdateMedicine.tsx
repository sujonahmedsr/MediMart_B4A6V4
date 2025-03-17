/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/services/medicine";
import axios from "axios";
import { IMedicine } from "@/types/medicine";

// Zod Schema
type medicineFormType = z.infer<typeof medicineSchema>;

const medicineSchema = z.object({
    name: z.string().min(1, "medicine name is required").optional(),
    image: z.string().optional(),
    price: z.number().min(1, "Price cannot be negative").optional(),
    category: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    quantity: z.number().min(1, "Quantity cannot be negative").optional(),
    expireDate: z.string().min(1, "Expire Date is required").optional(),
    manufacturerDetails: z.string().min(5, "Manufacturer details are required").optional(),
    requiredPrescription: z.boolean().optional(),
});

export default function UpdateMedicine({ product }: { product: IMedicine }) {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>(
        Array.isArray(product?.image) ? product?.image : product?.image ? [product.image] : []
      );
      
    const [categories, setCategories] = useState<ICategory[] | []>([]);
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            const category = await allCategories(undefined, '18');
            setCategories(category?.data?.result);
        };
        fetchData();
    }, []);

    const form = useForm<medicineFormType>({
        resolver: zodResolver(medicineSchema),
        defaultValues: {
            name: product?.name || "",
            image: product?.image || "",
            price: Number(product?.price),
            category: product?.category.name || "",
            description: product?.description || "",
            quantity: Number(product?.quantity),
            expireDate: product?.expireDate ? new Date(product?.expireDate).toISOString().split('T')[0] : "", // Convert Date to string in "YYYY-MM-DD"
            manufacturerDetails: product?.manufacturerDetails || "",
            requiredPrescription: product?.requiredPrescription || false,
        },
    });
    

    const onSubmit = async (data: medicineFormType) => {
        try {
            let imageUrl = product?.image || "";

            // Check if image exists and upload only if provided
            if (imageFiles && imageFiles.length > 0) {
                const formData = new FormData();
                formData.append("file", imageFiles[0]);
                formData.append("upload_preset", "cycle_labs");

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dvjeaplel/image/upload",
                    formData
                );

                imageUrl = response.data.secure_url; // Set image URL if uploaded
            }

            // Prepare medicine data (with or without image)
            const medicineData = {
                ...data,
                ...(imageUrl && { image: imageUrl }), // Add image only if it exists
            };

            const res = await updateProduct(product?._id ,medicineData);

            if (res?.status) {
                toast.success(res.message);
                router.push("/admin/medicines/all-medicines");
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            console.error(err);
            toast.error("Something went wrong please try again.");
        }
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
                            <Button variant={"outline"} className="text-xl font-semibold bg-blue-200 rounded-none pointer-events-none">
                               Update Medicine
                            </Button>
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medicine Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter medicine name" {...field} value={field.value || ""}/>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select medicine Category" />
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
                                <Textarea {...field} placeholder="Medicine Description" value={field.value || ""} />
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
                                    <Input type="date" {...field} value={field.value || ""}/>
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
                                <Textarea {...field} placeholder="Manufacturer Details" value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="rounded-none" type="submit">
                    Update Medicine
                </Button>
            </form>
        </Form>
    );
}
