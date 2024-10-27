import type { FunctionComponent } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RECORD_TYPE_OPTIONS } from "~/lib/record-type-options";

import { Button } from "~/components/ui/button";
import { CategorySelect } from "./category-selector";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "amount is required")
    .transform(Number)
    .pipe(z.number().positive("amount must be greater than 0")),
  category: z.string().min(1, "category is required"),
  type: z.enum(["income", "expense"]),
});

type FormInputs = {
  amount: string;
  category: string;
  type: "income" | "expense";
};

// Type for validated data (after transformation)
type FormData = z.infer<typeof formSchema>;

export const AddRecordForm: FunctionComponent = () => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      category: "",
      type: "income",
    },
  });

  const onSubmit = (data: FormInputs) => {
    const validatedData = data as unknown as FormData;
    console.log(validatedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="enter amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>category</FormLabel>
                <CategorySelect onValueChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RECORD_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          add record
        </Button>
      </form>
    </Form>
  );
};
