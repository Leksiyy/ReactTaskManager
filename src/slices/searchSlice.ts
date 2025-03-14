import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    query: string;
    tags: string[];
}

const initialState: SearchState = {
    query: "",
    tags: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchResults: (state, action: PayloadAction<{ query: string; tags: string[] }>) => {
            state.query = action.payload.query;
            state.tags = action.payload.tags;
        },
    },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
