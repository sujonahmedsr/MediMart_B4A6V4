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

// Zod schema for validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  password: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user, isLoading } = useUser();

  if (isLoading) {
    <div>Loading...</div>
  }
 
  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      city: user?.city || "",
      address: user?.address || "",
    },
  });

  const { reset } = form

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  // Handle profile update
  const onSubmit = (data: ProfileFormValues) => {
    alert("Profile updated successfully!");
    console.log("Updated Data:", data);
  };


  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false)
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
          className="w-24 h-24 rounded-full border-4 border-primary"
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
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} disabled={!isEditingProfile}/>
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
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Your email" {...field} value={field.value || ""} disabled={true}/>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label>Phone</Label>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} value={field.value || ""} disabled={!isEditingProfile}/>
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
              <FormItem>
                <Label>City</Label>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} value={field.value || ""} disabled={!isEditingProfile}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <Label>Address</Label>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} value={field.value || ""} disabled={!isEditingProfile}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          {isEditingProfile ? (
            <div className="flex gap-4 mt-4">
              <Button variant="outline"
              >
                Save Changes
              </Button>
              <Button variant="destructive" onClick={handleCancelProfileEdit}
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

