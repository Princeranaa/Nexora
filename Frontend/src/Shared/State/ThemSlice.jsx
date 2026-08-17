import { createSlice } from "@reduxjs/toolkit";

const themSlice = createSlice({
    name: "theme",
    initialState: {
        mode: localStorage.getItem("theme")
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
            localStorage.setItem("theme", state.mode)
        }
    }
})

export const {toggleTheme} = themSlice.actions
export default themSlice.reducer;