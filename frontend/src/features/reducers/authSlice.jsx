import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isLoggedIn:false,
        isLoading:true
    },
    reducers:{
        addUser:(state, action)=>{
            state.user = action.payload,
            state.isLoggedIn=true,
            state.isLoading=false
        },
        removeUser :(state)=>{
            state.user = null, 
            state.isLoggedIn =false,
            state.isLoading=false
        },
        finishLoading:(state) =>{
            state.isLoading = false
        }
    }
});

export const {isLoggedIn, addUser, removeUser, finishLoading} = authSlice.actions;

export default authSlice.reducer;