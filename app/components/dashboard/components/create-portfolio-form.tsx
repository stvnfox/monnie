import type { FunctionComponent } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPortfolio } from "~/queries/create-portfolio";
import { useToast } from "~/hooks/use-toast";

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

type CreatePortfolioFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const CreatePortfolioForm: FunctionComponent<
  CreatePortfolioFormProps
> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
    mutationFn: (values: { name: string }) => createPortfolio(values),
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
