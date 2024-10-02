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
import { CreateTaskForm } from "./create-task-form";

export interface AddTaskButtonProps {
  selectedSpaceName?: string;
}

export function AddTaskButton({ selectedSpaceName = "" }: AddTaskButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} asChild className="cursor-pointer">
          <div className="flex gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Task</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>
            Add a new task to one of your spaces.
          </DialogDescription>
        </DialogHeader>

        <CreateTaskForm selectedSpaceName={selectedSpaceName} />

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
