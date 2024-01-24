import React from "react";

import Task, { Task as TaskType } from "../Task/Task";

interface TaskListType {
  loading: boolean;
  tasks: Array<TaskType>;
  onPinTask: () => void;
  onArchiveTask: () => void;
}
export default function TaskList({
  loading,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListType) {
  const events = {
    onPinTask,
    onArchiveTask,
  };
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t) => t.task.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.task.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((eachTask) => (
        <Task key={eachTask.task.id} task={eachTask.task} {...events} />
      ))}
    </div>
  );
}
