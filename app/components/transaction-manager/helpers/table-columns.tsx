import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import type { Transaction } from "~/types/transactions";
import { TransactionCategoryIcon } from "./type-icons";
import { useToast } from "~/hooks/use-toast";
import { removeTransaction } from "~/queries/transactions/remove-transaction";
import { createCurrencyValue } from "./create-currency-value";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Spinner } from "~/components/ui/spinner";

export const columns: ColumnDef<Transaction>[] = [
  {
    header: "description",
    accessorKey: "description",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex items-center gap-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <TransactionCategoryIcon
                  category={transaction.category}
                  className="h-4 w-4 stroke-neutral-500"
                />
              </TooltipTrigger>
              <TooltipContent align="start">
                {transaction.category}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {transaction.description}
        </div>
      );
    },
  },
  {
    header: () => <div className="text-right">amount</div>,
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className="text-right">
        {createCurrencyValue(Number(row.original.amount))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const [open, setOpen] = useState(false);

      const queryClient = useQueryClient();
      const { toast } = useToast();

      const handleSuccessState = () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        toast({
          title: "transaction removed",
          description: "transaction has been successfully removed",
        });
      };

      const mutation = useMutation({
        mutationFn: (id: number) => removeTransaction(id),
        onSuccess: () => handleSuccessState(),
      });

      if (mutation.isPending) {
        return <Spinner />;
      }

      return (
        <div className="text-right">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-end">
                <span className="sr-only">open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => mutation.mutate(transaction.id)}
              >
                <Trash className="h-4 w-4" />
                delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {mutation.isError && (
            <div className="text-red-500 text-sm !mt-2">
              something went wrong. please try again later
            </div>
          )}
        </div>
      );
    },
  },
];
