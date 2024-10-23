import { useState, type FunctionComponent } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { CreatePortfolioForm } from "./create-portfolio-form";

export const CreatePortfolioDialog: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-4">
          create portfolio item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>create portfolio item</DialogTitle>
          <DialogDescription>
            a portfolio is a way to organize your financial records and goals.
            use it to group related budgets or projects, like personal expenses
            or savings plans. give your portfolio a clear, descriptive name.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreatePortfolioForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
