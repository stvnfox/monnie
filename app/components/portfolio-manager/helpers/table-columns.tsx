import type { ColumnDef } from "@tanstack/react-table";
import type { Portfolio } from "~/types/portfolios";
import { Eye, MoreHorizontal, Trash } from "lucide-react";

import { getTypeIcon } from "./type-icons";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<Portfolio>[] = [
  {
    header: "name",
    accessorKey: "name",
    cell: ({ row }) => {
      const portfolio = row.original;
      const IconComponent = getTypeIcon(portfolio.type);

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

      return (
        <div className="text-right">
          <DropdownMenu>
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
                onClick={() =>
                  console.log(`remove portfolio with id: ${portfolio.id}`)
                }
              >
                <Trash className="h-4 w-4" />
                delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
