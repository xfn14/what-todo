"use client";

import { ArrowUpCircle, BarChart2, CheckCircle2, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useSpacesStore } from "~/stores/spaces-store";
import { useTasksStore } from "~/stores/tasks-store";

const TasksStats = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const spaces = useSpacesStore((state) => state.spaces);
  const getTodaysTasks = useTasksStore((state) => state.getTodaysTasks);
  const completedTasks = tasks.filter((task) => task.isComplete);

  const getMostActiveSpace = (): { name: string; count: number } | null => {
    const incompleteTasks = tasks.filter((task) => !task.isComplete);

    if (incompleteTasks.length === 0) {
      return null;
    }

    const spaceTaskCount: Record<number, number> = {};
    incompleteTasks.forEach((task) => {
      spaceTaskCount[task.space_id] = (spaceTaskCount[task.space_id] || 0) + 1;
    });

    let mostActiveSpaceId: number | null = null;
    let maxCount = 0;

    Object.entries(spaceTaskCount).forEach(([spaceId, count]) => {
      if (count > maxCount) {
        mostActiveSpaceId = Number(spaceId);
        maxCount = count;
      }
    });

    const mostActiveSpace = spaces.find(
      (space) => space.id === mostActiveSpaceId,
    );

    if (!mostActiveSpace) {
      return null;
    }

    return {
      name: mostActiveSpace.name,
      count: maxCount,
    };
  };

  const mostActiveSpace = getMostActiveSpace();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasks.length}</div>
          <p className="text-xs text-muted-foreground">
            {getTodaysTasks().length} for today
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.ceil((100 * completedTasks.length) / tasks.length)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {completedTasks.length} of {tasks.length} completed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Most Active Space
          </CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {mostActiveSpace === null ? (
            <div className="flex items-center gap-2 text-2xl font-bold">
              All tasks done{" "}
              <ThumbsUp className="h-6 w-6 text-green-500/80" strokeWidth="4" />
            </div>
          ) : (
            <div>
              <div className="text-2xl font-bold">{mostActiveSpace?.name}</div>
              <p className="text-xs text-muted-foreground">
                With {mostActiveSpace?.count} incomplete tasks
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksStats;
