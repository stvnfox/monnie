import type { FunctionComponent } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "~/hooks/use-toast";
import { createPortfolio } from "~/queries/create-portfolio";
import { PORTFOLIO_TYPES } from "~/types/portfolios";
import { PORTFOLIO_OPTIONS } from "~/lib/portfolio-options";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getPortfolioTypeIcon } from "../helpers/type-icons";

type CreatePortfolioFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
  type: z.nativeEnum(PORTFOLIO_TYPES),
});

export const CreatePortfolioForm: FunctionComponent<
  CreatePortfolioFormProps
> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "personal",
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSuccessState = () => {
    queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    setOpen(false);
    toast({
      title: "portfolio created",
      description: "your portfolio has been created",
    });
  };

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => createPortfolio(values),
    onSuccess: () => handleSuccessState(),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => mutation.mutate(form.getValues()))}
        className="space-y-8 mb-0"
      >
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PORTFOLIO_OPTIONS.map((option) => {
                    const IconComponent = getPortfolioTypeIcon(option.label);

                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex gap-2 items-center">
                          <IconComponent className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {mutation.isError && (
          <div className="text-red-500 text-sm !mt-2">
            something went wrong. please try again later
          </div>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="ml-auto"
          >
            {mutation.isPending ? <Spinner /> : "create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
