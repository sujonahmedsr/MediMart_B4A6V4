/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/AuthService";
import { useUser } from "@/userContextApi/UserProvider";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirectPath")
  const router = useRouter()

  const {
    formState: { isSubmitting },
  } = form;

  const { setIsLoading } = useUser()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data, "from");

      const res = await loginUser(data);
      setIsLoading(true)

      if (res?.status) {
        toast.success(res?.message);

        if (redirect) {
          router.push(redirect)
        } else {
          router.push('/')
        }
      } else {
        toast.error(res?.message);
      }

    } catch (err: any) {
      console.error(err);
      toast.error("Login Failed Try Again.")
    }
  };

  return (
    <div className="border border-gray-300 rounded flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-between mb-4 space-x-4 ">
        <Link href={'/'} className="text-2xl font-bold flex items-center gap-2">
          <span>💊</span>
          <h1>Medi<span className="text-cyan-900">Mart</span></h1>
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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

          <Button
            type="submit"
            className="mt-5 w-full rounded bg-cyan-900 hover:bg-cyan-950 text-white duration-300 transition-all"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ? 
         <Link href="/register" className="text-cyan-900 hover:underline">
           Register
        </Link>
      </p>
    </div>
  );
}