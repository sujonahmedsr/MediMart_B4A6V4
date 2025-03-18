/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@/userContextApi/UserProvider";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage, FormControl } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfile } from "@/services/AuthService";
import axios from "axios";
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

const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user, isLoading } = useUser();
  const [imagePreview, setImagePreview] = useState<File | null>(null);

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

  const { reset } = form;

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
    }
  }, [user, reset]);

  if (isLoading) {
    return <Loading />; // Ensure the page stops rendering until the user data is loaded
  }

  const handleImageChange = (file: File) => {
    setImagePreview(file); // Create a preview URL for the image
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      let imageUrl = user?.image || "";
      if (imagePreview) {
        const formData = new FormData();
        formData.append("file", imagePreview);
        formData.append("upload_preset", "cycle_labs"); // Replace with your Cloudinary preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvjeaplel/image/upload", // Replace with your Cloudinary cloud name
          formData
        );
        // cloudirnay img url 
        imageUrl = response.data.secure_url
      }
      const res = await updateProfile({ ...data, image: imageUrl });

      if (res?.status) {
        toast.success(res.message);
        setIsEditingProfile(false)
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
    <div className="max-w-2xl w-full container mx-auto p-6 bg-white shadow-lg rounded mt-8 space-y-6 border">
      {/* User Avatar */}
      <div className="flex flex-col items-center gap-3 text-center">
        <Image
          src={user?.image || "https://github.com/shadcn.png"}
          alt="User Avatar"
          width={100}
          height={100}
          className="w-24 h-24 rounded-full border border-cyan-900"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-500">Role: {user?.role}</p>
          {user?.isBlocked ? <Button variant={"destructive"} className="mt-2">Blocked</Button> : <Button variant={"outline"} className="mt-2">Active</Button>}
        </div>
      </div>

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
                    <Input placeholder="Enter your city" {...field} value={field.value || ""} disabled={!isEditingProfile} />
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
                    <Input placeholder="Enter your address" {...field} value={field.value || ""} disabled={!isEditingProfile} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional rendering of the Profile Image upload */}
            {isEditingProfile &&
              <>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label>Profile Image</Label>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageChange(file); // Handle the file change
                              }
                            }}
                            id="image-upload"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            }
          </div>



          {/* Submit Button */}
          {isEditingProfile ? (
            <div className="flex gap-4 mt-4">
              <Button variant="outline"
                className="rounded"
              >
                Save Changes
              </Button>
              <Button variant="destructive" className="rounded" onClick={handleCancelProfileEdit}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => setIsEditingProfile(true)}
            >
              Edit Profile
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Profile;

