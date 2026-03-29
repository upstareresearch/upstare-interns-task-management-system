import { axiosintance } from "../../config/axiosintance"
import { addUser } from "../reducers/authSlice";

// =======================
// User Register Api
// =======================

export const userRegisterApi = (data) => async (dispatch) => {
    try {
        const response = await axiosintance.post("/api/auth/register", data);
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    }
};

// =========================
// User Login Api
//==========================

export const userLoginApi = (data) => async (dispatch) => {
    try {
        const response = await axiosintance.post("/api/auth/login", data);
        if (response) {
            return dispatch(addUser(response.data.user));
        }
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ====================
// User Logout Api
// ====================

export const userLogoutApi = () => async(dispatch)=>{
    try {
        const response = await axiosintance.get("/api/auth/logout")
        if(response){
            return response.data
        }
    } catch (error) {
        throw error.response?.data  || error
    }
}
