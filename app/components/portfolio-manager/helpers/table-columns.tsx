import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { Portfolio } from "~/types/portfolios";
import { getPortfolioTypeIcon } from "./type-icons";
import { removePortfolio } from "~/queries/portfolio/remove-portfolio";
import { useToast } from "~/hooks/use-toast";

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

export const columns: ColumnDef<Portfolio>[] = [
  {
    header: "name",
    accessorKey: "name",
    cell: ({ row }) => {
      const portfolio = row.original;
      const IconComponent = getPortfolioTypeIcon(portfolio.type);

      return (
        <div className="flex items-center gap-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <IconComponent className="h-4 w-4 stroke-neutral-400" />
              </TooltipTrigger>
              <TooltipContent align="start">{portfolio.type}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link
            to="/portfolio/$id"
            params={{ id: portfolio.id.toString() }}
            className="w-full"
          >
            {portfolio.name}
          </Link>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const portfolio = row.original;

      const [open, setOpen] = useState(false);

      const queryClient = useQueryClient();
      const { toast } = useToast();

      const handleSuccessState = () => {
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        toast({
          title: "portfolio removed",
          description: `portfolio with name: ${portfolio.name} has been successfully removed`,
        });
      };

      const mutation = useMutation({
        mutationFn: (id: number) => removePortfolio(id),
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
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  to="/portfolio/$id"
                  className="flex items-center gap-2"
                  params={{ id: portfolio.id.toString() }}
                >
                  <Eye className="h-4 w-4" />
                  view portfolio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => mutation.mutate(portfolio.id)}
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
