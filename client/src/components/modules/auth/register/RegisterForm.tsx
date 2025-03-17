/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/userContextApi/UserProvider";


export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const router = useRouter()

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const { setIsLoading } = useUser()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true)

      if (res?.status) {
        toast.success(res?.message);
        router.push('/login')
      } else {
        toast.error(res?.message);
      }

    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border border-gray-300 rounded flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 mb-4">
        <Link href={'/'} className="text-2xl font-bold flex items-center justify-between gap-2">
          <span>💊</span>
          <h1>Medi<span className="text-cyan-900">Mart</span></h1>
        </Link>
        <div className="text-end">
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-3">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-3">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-3">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            // disabled={passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="mt-5 w-full rounded bg-cyan-900 hover:bg-cyan-950 text-white duration-300 transition-all"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account ?
        <Link href="/login" className="text-cyan-900 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}