import {createSlice} from '@reduxjs/toolkit';
const initialState = {user : null};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = {...state.user, ...action.payload};
        },
        logout: (state) => {
            state.user = null;    
            state.allProjects = [];
            state.activeProject = null;
            state.transcripts = [];
            state.activeTranscript = null;
        }, 
    }
});


export const {login, logout} = authSlice.actions;
export default authSlice.reducer;