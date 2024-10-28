import type { FunctionComponent } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import type { Portfolio } from "~/types/portfolios";
import { addTransaction } from "~/queries/add-transaction";
import { TRANSACTION_TYPE_OPTIONS } from "~/lib/transaction-type-options";
import type {
  TransactionCategoryValue,
  TransactionType,
} from "~/types/transactions";

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
  description: z.string(),
  type: z.enum(["income", "expense"]),
});

export type FormInputs = {
  amount: string;
  category: TransactionCategoryValue | "";
  description: string;
  type: TransactionType;
};

interface AddTransactionFormProps {
  portfolio: Portfolio;
}

export const AddTransactionForm: FunctionComponent<AddTransactionFormProps> = ({
  portfolio,
}) => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      category: "",
      description: "",
      type: "income",
    },
  });

  //   const onSubmit = (data: FormInputs) => {
  //     const validatedData = data as unknown as FormData;
  //     console.log(validatedData);
  //   };

  const mutation = useMutation({
    mutationFn: (values: FormInputs) =>
      addTransaction({
        ...values,
        portfolioId: portfolio.id,
        userId: portfolio.userId,
      }),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => mutation.mutate(form.getValues()))}
        className="space-y-4"
      >
        <div className="grid grid-cols-3 space-x-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-1">
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
              <FormItem className="col-span-2">
                <FormLabel>category</FormLabel>
                <CategorySelect onValueChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>
                description{" "}
                <span className="text-sm text-neutral-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  {TRANSACTION_TYPE_OPTIONS.map((option) => (
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
          add transaction
        </Button>
      </form>
    </Form>
  );
};