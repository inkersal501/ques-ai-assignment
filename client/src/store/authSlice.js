import {createSlice} from '@reduxjs/toolkit';
const initialState = {user : JSON.parse(localStorage.getItem("user")) || null};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = {...state.user, ...action.payload};
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null; 
            localStorage.removeItem("user"); 
            localStorage.removeItem("allProjects");
        }, 
    }
});


export const {login, logout} = authSlice.actions;
export default authSlice.reducer;