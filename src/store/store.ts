import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../slices/settingsSlice";
import searchReducer from "../slices/searchSlice";
import tasksReducer from "../slices/tasksSlice";


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        search: searchReducer,
        tasks: tasksReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
