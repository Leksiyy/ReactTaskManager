import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types/types";
import { fakeTasks } from "../mockData/tasksData";    // <<-- Заглушка fakeTasks чтобы не пересоздавать карточки вручную.


interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: fakeTasks,    // <<-- fakeTasks Data
    // tasks: [],        // << -- manual task data
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt" | "isCompleted" | "isDeleted">>) => {
            const { title, text, tags, background } = action.payload;
            
            const newTask: Task = {
                id: uuidv4(),
                title,
                text,
                createdAt: new Date().toLocaleDateString(),
                isCompleted: false,
                isDeleted: false,
                tags,
                background,
            };    
            state.tasks.unshift(newTask);
        },

        completeTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if(task) {
                task.isCompleted = true;
                task.completedAt = new Date().toLocaleDateString();
            }
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.isDeleted = true;
                task.deletedAt = new Date().toLocaleDateString();
              }
        },

        editTask: (state, action: PayloadAction<{ taskId: string; updatedData: Partial<Task>}>) => {
            const task = state.tasks.find((task) => task.id === action.payload.taskId);
            if(task) {
                Object.assign(task, action.payload.updatedData);    // <<-- обновит только переданные поля?
                task.updatedAt = new Date().toLocaleDateString();
            }
        },

        restoreTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find((task) => task.id === action.payload)
            if(task) {
                task.isDeleted = false;
                task.deletedAt = undefined;
                task.isCompleted = false;
                task.completedAt = undefined;
            }
        },

    },
});

export const { addTask, completeTask, deleteTask, editTask, restoreTask } = tasksSlice.actions;
export default tasksSlice.reducer;