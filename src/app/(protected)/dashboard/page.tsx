import { getMyTasks } from "~/server/queries";
import { AllTasksList } from "./_components/all-tasks-list";

const DashboardPage = async () => {
  const tasks = await getMyTasks();

  return (
    <main className="mt-8 flex w-full justify-center">
      <div className="flex flex-col">
        <AllTasksList tasks={tasks} />
      </div>
    </main>
  );
};

export default DashboardPage;
