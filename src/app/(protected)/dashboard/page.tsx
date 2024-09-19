import { getMySpaces, getMyTasks } from "~/server/db/queries";
import { AddSpaceButton } from "./_components/add-space-button";
import { SelectSpaceMenu } from "./_components/select-space-menu";
import { TasksListWrapper } from "./_components/tasks-list-wrapper";

const DashboardPage = async () => {
  const tasks = await getMyTasks();
  const spaces = await getMySpaces();
  const parentlessSpaces = spaces.filter((space) => space.parent_space == -1);

  return (
    <main className="mt-2 flex w-full flex-col justify-center px-6 py-2">
      <div className="mb-2 flex items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddSpaceButton parentlessSpaces={parentlessSpaces} />
      </div>

      <div className="my-2 flex flex-col gap-4">
        <SelectSpaceMenu spaces={spaces} />

        {spaces.length === 0 ? (
          <div className="text-muted-foreground">
            You don&apos;t have any spaces yet. Create one to start adding
            tasks.
          </div>
        ) : (
          <TasksListWrapper initialTasks={tasks} spaces={spaces} />
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
