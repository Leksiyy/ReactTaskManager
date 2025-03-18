import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchQuery = {
    searchString: string;
    searchTags: string[];
};

const initialState: SearchQuery = {
    searchString: "",
    searchTags: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchString: (state, action: PayloadAction<string>) => {
            state.searchString = action.payload;
        },
        setSearchTags: (state, action: PayloadAction<string[]>) => {
            state.searchTags = action.payload;
        },
        resetSearch: () => initialState, // Сброс к начальному состоянию
    },
});

export const { setSearchString, setSearchTags, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;