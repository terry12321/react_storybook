import React from "react";

import * as TaskStories from "../Task/Task.stories";
import TaskList from "./Tasklist";

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
};

export const Default = {
  args: {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in Task.stories.jsx.
    tasks: [
      { task: { ...TaskStories.Default.args.task, id: "1", title: "Task 1" } },
      { task: { ...TaskStories.Default.args.task, id: "2", title: "Task 2" } },
      { task: { ...TaskStories.Default.args.task, id: "3", title: "Task 3" } },
      { task: { ...TaskStories.Default.args.task, id: "4", title: "Task 4" } },
      { task: { ...TaskStories.Default.args.task, id: "5", title: "Task 5" } },
      { task: { ...TaskStories.Default.args.task, id: "6", title: "Task 6" } },
    ],
  },
};

export const WithPinnedTasks = {
  args: {
    tasks: [
      ...Default.args.tasks.slice(0, 5),
      { task: { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" } },
    ],
  },
};

export const Loading = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
  },
};
