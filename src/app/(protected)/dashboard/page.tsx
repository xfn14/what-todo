import { getMyTasks } from "~/server/queries";
import { AddTaskButton } from "./_components/add-task-button";

const DashboardPage = async () => {
  const tasks = await getMyTasks();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <h2 className="text-xl">Tasks</h2>

        <AddTaskButton />

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
