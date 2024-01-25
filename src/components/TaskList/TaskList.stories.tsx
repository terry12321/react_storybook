import React from "react";

import * as TaskStories from "../Task/Task.stories";
import TaskList from "./Tasklist";
import { Provider } from "react-redux";

import { configureStore, createSlice } from "@reduxjs/toolkit";

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
  status: "idle",
  error: null,
};

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
};

// export const Default = {
//   args: {
//     // Shaping the stories through args composition.
//     // The data was inherited from the Default story in Task.stories.jsx.
//     tasks: [
//       { task: { ...TaskStories.Default.args.task, id: "1", title: "Task 1" } },
//       { task: { ...TaskStories.Default.args.task, id: "2", title: "Task 2" } },
//       { task: { ...TaskStories.Default.args.task, id: "3", title: "Task 3" } },
//       { task: { ...TaskStories.Default.args.task, id: "4", title: "Task 4" } },
//       { task: { ...TaskStories.Default.args.task, id: "5", title: "Task 5" } },
//       { task: { ...TaskStories.Default.args.task, id: "6", title: "Task 6" } },
//     ],
//   },
// };

// export const WithPinnedTasks = {
//   args: {
//     tasks: [
//       ...Default.args.tasks.slice(0, 5),
//       { task: { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" } },
//     ],
//   },
// };

// export const Loading = {
//   args: {
//     tasks: [],
//     loading: true,
//   },
// };

// export const Empty = {
//   args: {
//     // Shaping the stories through args composition.
//     // Inherited data coming from the Loading story.
//     ...Loading.args,
//     loading: false,
//   },
// };

export const Default = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
  ],
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedtasks = [
        ...MockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedtasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          status: "loading",
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
