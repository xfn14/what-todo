import { getMySpaces, getMyTasks } from "~/server/db/queries";
import { AllTasksList } from "./_components/all-tasks-list";
import { AddSpaceButton } from "./_components/add-space-button";

const DashboardPage = async () => {
  const tasks = await getMyTasks();
  const spaces = await getMySpaces();

  return (
    <main className="mt-8 flex w-full justify-center">
      <div className="flex flex-col">
        <div className="mb-2 flex items-center justify-between p-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <AddSpaceButton
            parentlessSpaces={spaces.filter(
              (space) => space.parent_space == -1,
            )}
          />
        </div>

        <AllTasksList tasks={tasks} spaces={spaces} />
      </div>
    </main>
  );
};

export default DashboardPage;
