"use client";

import { useState, type FunctionComponent, type ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const CreatePortfolioForm: FunctionComponent<{
  children?: ReactNode;
}> = ({ children }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    //reset error state
    setError(false);
    // TODO: Add Tanstack Query for fetches etc
    try {
      const response = await fetch("/api/portfolio/create", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setError(true);
        console.error("Error creating portfolio:", response);
      } else {
        console.log("Portfolio created successfully:", await response.json());
      }
    } catch (error) {
      setError(true);
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>portfolio name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* TODO: add toasters when error or success */}
          {error && (
            <div className="text-red-500 text-sm !mt-2">
              something went wrong. please try again later
            </div>
          )}
          {children}
        </form>
      </Form>
    </>
  );
};
