import { createSlice } from "@reduxjs/toolkit";

const initialState = {allProjects : JSON.parse(localStorage.getItem("allProjects")) || []};
const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {
        updateProjects : (state, action) => {
            state.allProjects = [...action.payload];
            localStorage.setItem("allProjects", JSON.stringify(state.allProjects));
        } 
    }
});

export const {updateProjects} = projectSlice.actions;
export default projectSlice.reducer;