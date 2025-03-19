import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
    bgColor: string;
    padding: number;
    titleSize: number;
    descriptionSize: number;
    
    cardWidth: number;
    cardHeight: number;
}

const initialState: SettingsState = {
    bgColor: "#ffffff",
    padding: 0,
    titleSize: 20,
    descriptionSize: 14,

    // Вынес размеры карточк сразу в слайс, потом можно сделать в настроиках возможность задавать рамзеры карточек.
    cardWidth: 372,      
    cardHeight: 350,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setBgColor: (state, action: PayloadAction<string>) => {
            state.bgColor = action.payload;
        },
        setPadding: (state, action: PayloadAction<number>) => {
            state.padding = action.payload;
        },
        setTitleSize: (state, action: PayloadAction<number>) => {
            state.titleSize = action.payload;
        },
        setDescriptionSize: (state, action: PayloadAction<number>) => {
            state.descriptionSize = action.payload;
        },
        setCardWidth: (state, action: PayloadAction<number>) => {
            state.cardWidth = action.payload;
        },
        setCardHeight: (state, action: PayloadAction<number>) => {
            state.cardHeight = action.payload;
        },
        resetSettings: () => initialState,
    },
});

export const { setBgColor, setPadding, setTitleSize, setDescriptionSize, resetSettings, setCardWidth, setCardHeight } =
    settingsSlice.actions;
export default settingsSlice.reducer;
