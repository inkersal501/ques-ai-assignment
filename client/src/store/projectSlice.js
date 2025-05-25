import { createSlice } from "@reduxjs/toolkit";

const initialState = {allProjects : [], activeProject: null, transcripts: [], activeTranscript: null};
const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {
        updateProjects : (state, action) => {
            state.allProjects = [...action.payload]; 
        },
        updateActive : (state, action) => {
            state.activeProject = action.payload;
        },
        updateTranscripts : (state, action) => {
            state.transcripts = [...action.payload]; 
        },
        updateActiveTranscript : (state, action) => {
            state.activeTranscript = action.payload;
        },
    }
});

export const {updateProjects, updateActive, updateTranscripts, updateActiveTranscript} = projectSlice.actions;
export default projectSlice.reducer;