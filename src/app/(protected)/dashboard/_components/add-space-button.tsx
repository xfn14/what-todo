import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AddSpaceForm } from "./add-space-form";

export function AddSpaceButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} asChild className="cursor-pointer">
          <div className="flex gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Space</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new space</DialogTitle>
          <DialogDescription>
            Create a new space to add tasks to it.
          </DialogDescription>
        </DialogHeader>

        <AddSpaceForm />

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
