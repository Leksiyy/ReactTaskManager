import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types/types"



interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};



const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{title: string; text: string; tags?: string[]}>) => {
            const newTask: Task = {
                id: uuidv4(),
                title: action.payload.title,
                text: action.payload.text,
                createdAt: new Date().toLocaleDateString(),
                tags: action.payload.tags || [],
            };
            state.tasks.push(newTask);
        },

    },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;