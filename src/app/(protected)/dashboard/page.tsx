import { getMySpaces, getMyTasks } from "~/server/db/queries";
import { AllTasksList } from "./_components/all-tasks-list";
import { AddSpaceButton } from "./_components/add-space-button";

const DashboardPage = async () => {
  const tasks = await getMyTasks();
  const spaces = await getMySpaces();

  return (
    <main className="mt-2 flex w-full flex-col justify-center px-6 py-2">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="my-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <AddSpaceButton
            parentlessSpaces={spaces.filter(
              (space) => space.parent_space == -1,
            )}
          />
        </div>

        {spaces.length === 0 ? (
          <div className="text-muted-foreground">
            You don't have any spaces yet. Create one to start adding tasks.
          </div>
        ) : (
          <AllTasksList tasks={tasks} spaces={spaces} />
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
