import { getMyTasks } from "~/server/queries";
import { AddTaskButton } from "./_components/add-task-button";
import { TasksList } from "./_components/tasks-list";

const DashboardPage = async () => {
  const tasks = await getMyTasks();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <h2 className="text-xl">Tasks</h2>

        <AddTaskButton />

        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default DashboardPage;
